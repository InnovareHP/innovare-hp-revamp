import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { validateWithRetry } from "@/lib/turnstile";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { eventId, name, email, phone, turnstileToken } = await req.json();

    if (!eventId || !name || !email || !phone || !turnstileToken) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate Turnstile token
    const headersList = await headers();
    const ip =
      headersList.get("cf-connecting-ip") ??
      headersList.get("x-forwarded-for")?.split(",")[0] ??
      undefined;
    const verification = await validateWithRetry(turnstileToken, ip);
    if (!verification?.success) {
      return NextResponse.json(
        { error: "Security verification failed" },
        { status: 403 }
      );
    }

    // Fetch event and validate
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Event is not open for registration" },
        { status: 400 }
      );
    }

    if (!event.isPaid || !event.price || Number(event.price) <= 0) {
      return NextResponse.json(
        { error: "This event does not require payment" },
        { status: 400 }
      );
    }

    // Check capacity
    if (event.maxGuests > 0 && event.attendees.length >= event.maxGuests) {
      return NextResponse.json(
        { error: "Event has reached maximum capacity" },
        { status: 400 }
      );
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json(
        { error: "Registration deadline has passed" },
        { status: 400 }
      );
    }

    // Check for existing attendee (prevent duplicate registration)
    const existingAttendee = await prisma.eventAttendee.findFirst({
      where: { eventId, email },
    });

    if (existingAttendee) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: event.currency || "usd",
              product_data: {
                name: event.title,
                description: `Registration for ${event.title}`,
              },
              unit_amount: Math.round(Number(event.price) * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${eventId}?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${eventId}?payment=cancelled`,
        metadata: { eventId, name, email, phone },
      },
      {
        idempotencyKey: `checkout_${eventId}_${email}_${Date.now()}`,
      }
    );

    // Create attendee with PENDING status
    await prisma.eventAttendee.create({
      data: {
        eventId,
        name,
        email,
        phone,
        stripeSessionId: session.id,
        paymentStatus: "PENDING",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

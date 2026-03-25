import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    // event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // // Payment succeeded
  // if (event.type === "checkout.session.completed") {
  //   const session = event.data.object;

  //   const attendee = await prisma.eventAttendee.findUnique({
  //     where: { stripeSessionId: session.id },
  //   });

  //   if (attendee && attendee.paymentStatus !== "PAID") {
  //     await prisma.eventAttendee.update({
  //       where: { id: attendee.id },
  //       data: {
  //         paymentStatus: "PAID",
  //         amountPaid: session.amount_total ? session.amount_total / 100 : 0,
  //       },
  //     });

  //     // Send confirmation & admin notification emails
  //     const eventData = await prisma.event.findUnique({
  //       where: { id: attendee.eventId },
  //       include: { media: true, attendees: true },
  //     });

  //     if (eventData) {
  //       await sendEventRegistrationEmails({
  //         attendeeName: attendee.name,
  //         attendeeEmail: attendee.email,
  //         attendeePhone: attendee.phone,
  //         event: eventData,
  //       });
  //     }

  //     revalidatePath(`/events/${eventData?.slug}`);
  //   }
  // }

  // // Checkout expired - user never completed payment
  // // Remove the PENDING attendee so they don't block event capacity
  // if (event.type === "checkout.session.expired") {
  //   const session = event.data.object;

  //   const attendee = await prisma.eventAttendee.findUnique({
  //     where: { stripeSessionId: session.id },
  //     include: { event: true },
  //   });

  //   if (attendee && attendee.paymentStatus === "PENDING") {
  //     await prisma.eventAttendee.delete({
  //       where: { id: attendee.id },
  //     });

  //     revalidatePath(`/events/${attendee.event.slug}`);
  //   }
  // }

  // // Payment failed
  // if (event.type === "payment_intent.payment_failed") {
  //   const paymentIntent = event.data.object;

  //   // Find the checkout session linked to this payment intent
  //   const sessions = await stripe.checkout.sessions.list({
  //     payment_intent: paymentIntent.id,
  //     limit: 1,
  //   });

  //   if (sessions.data.length > 0) {
  //     const stripeSession = sessions.data[0];
  //     const attendee = await prisma.eventAttendee.findUnique({
  //       where: { stripeSessionId: stripeSession.id },
  //       include: { event: true },
  //     });

  //     if (attendee && attendee.paymentStatus === "PENDING") {
  //       const declineReason =
  //         paymentIntent.last_payment_error?.message ||
  //         paymentIntent.last_payment_error?.code ||
  //         "Payment failed";

  //       await prisma.eventAttendee.update({
  //         where: { id: attendee.id },
  //         data: {
  //           paymentStatus: "FAILED",
  //           note: declineReason,
  //         },
  //       });

  //       revalidatePath(`${attendee.event.slug}`);
  //     }
  //   }
  // }

  // // Refund processed (from Stripe dashboard or API)
  // if (event.type === "charge.refunded") {
  //   const charge = event.data.object;
  //   const paymentIntentId =
  //     typeof charge.payment_intent === "string"
  //       ? charge.payment_intent
  //       : charge.payment_intent?.id;

  //   if (paymentIntentId) {
  //     const sessions = await stripe.checkout.sessions.list({
  //       payment_intent: paymentIntentId,
  //       limit: 1,
  //     });

  //     if (sessions.data.length > 0) {
  //       const stripeSession = sessions.data[0];
  //       const attendee = await prisma.eventAttendee.findUnique({
  //         where: { stripeSessionId: stripeSession.id },
  //         include: { event: true },
  //       });

  //       if (attendee && attendee.paymentStatus !== "REFUNDED") {
  //         await prisma.eventAttendee.update({
  //           where: { id: attendee.id },
  //           data: { paymentStatus: "REFUNDED" },
  //         });

  //         revalidatePath(`/events/${attendee.event.slug}`);
  //       }
  //     }
  //   }
  // }

  return NextResponse.json({ received: true });
}

"use server";

import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import {
  sendAdminCustomEmail,
  sendRefundConfirmationEmail,
} from "@/lib/send-event-email";
import { createTeamsMeeting, deleteTeamsMeeting } from "@/lib/teams";
import { formatDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function getEventsAuthenticated(
  limit: number = 10,
  page: number = 1
): Promise<
  ActionResponse<{
    events: (Prisma.EventGetPayload<{
      include: {
        media: true;
        _count: { select: { attendees: true } };
      };
    }> & { totalAttendees: number })[];
    totalPages: number;
    page: number;
    total: number;
  }>
> {
  try {
    await requireAdmin();
    const offset = (page - 1) * limit;

    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        include: {
          media: true,
          expectations: {
            select: {
              description: true,
            },
          },
          _count: {
            select: {
              attendees: true, // 👈 relation name
            },
          },
        },
        orderBy: {
          eventStartDate: "desc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.event.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const formattedEvents = events.map((event) => ({
      ...event,
      price: event.price ? Number(event.price) : null,
      totalAttendees: event._count.attendees,
      expectations: event.expectations.map(
        (expectation) => expectation.description
      ),
      _count: undefined, // optional cleanup
    }));

    return {
      success: true,
      data: {
        events: formattedEvents as any,
        totalPages,
        page,
        total,
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

export const createEvent = async (event: Prisma.EventCreateInput) => {
  try {
    await requireAdmin();

    const newEvent = await prisma.event.create({
      data: event,
    });

    // Auto-create Teams meeting for virtual events
    if (newEvent.eventType === "VIRTUAL") {
      try {
        const meeting = await createTeamsMeeting({
          title: newEvent.title,
          startDate: newEvent.eventStartDate,
          endDate: newEvent.eventEndDate,
        });

        await prisma.event.update({
          where: { id: newEvent.id },
          data: {
            teamsMeetingId: meeting.meetingId,
            teamsMeetingUrl: meeting.joinUrl,
          },
        });
      } catch (teamsError) {
        // Log but don't fail the event creation
        console.error("Teams meeting creation failed:", teamsError);
      }
    }

    revalidatePath("/admin/events");
    return {
      success: true,
      data: {
        ...newEvent,
        price: newEvent.price ? Number(newEvent.price) : null,
      },
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: "Failed to create event" };
  }
};

export const deleteEvent = async (ids: string[]) => {
  try {
    await requireAdmin();

    // Clean up Teams meetings before deleting
    const events = await prisma.event.findMany({
      where: { id: { in: ids } },
      select: { teamsMeetingId: true },
    });
    await Promise.allSettled(
      events
        .filter((e) => e.teamsMeetingId)
        .map((e) => deleteTeamsMeeting(e.teamsMeetingId!))
    );

    await prisma.$transaction([
      prisma.eventAttendee.deleteMany({
        where: { eventId: { in: ids } },
      }),
      prisma.event.deleteMany({
        where: { id: { in: ids } },
      }),
    ]);

    revalidatePath("/admin/events");
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: "Failed to delete event" };
  }
};

interface SendEventEmailParams {
  eventId: string;
  recipientEmails: string[];
  subject: string;
  message: string;
  includeEventDetails?: boolean;
}

export async function sendEventEmail({
  eventId,
  recipientEmails,
  subject,
  message,
  includeEventDetails = true,
}: SendEventEmailParams): Promise<
  ActionResponse<{ successful: number; failed: number }>
> {
  try {
    await requireAdmin();
    // Fetch event and attendees
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendees: true,
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    // Get recipient names from attendees
    const recipientNames = recipientEmails.map((email) => {
      const attendee = event.attendees.find((a) => a.email === email);
      return attendee?.name || "Attendee";
    });

    // Prepare event details if requested
    const eventTitle = includeEventDetails ? event.title : undefined;
    const eventDate = includeEventDetails
      ? formatDate(event.eventStartDate)
      : undefined;
    const eventLocation = includeEventDetails ? event.location : undefined;

    // Send emails
    const result = await sendAdminCustomEmail({
      recipients: recipientEmails,
      recipientNames,
      subject,
      message,
      eventTitle,
      eventDate,
      eventLocation,
      eventId,
      slug: event.slug,
    });

    if (!result.success) {
      return { success: false, error: "Failed to send emails" };
    }

    return {
      success: true,
      data: {
        successful: result.successful || 0,
        failed: result.failed || 0,
      },
    };
  } catch (error) {
    console.error("Error sending event email:", error);
    return { success: false, error: "Failed to send emails" };
  }
}

export async function refundAttendee(
  attendeeId: string,
  reason?: string
): Promise<ActionResponse> {
  try {
    await requireAdmin();

    const attendee = await prisma.eventAttendee.findUnique({
      where: { id: attendeeId },
    });

    if (!attendee) {
      return { success: false, error: "Attendee not found" };
    }

    if (attendee.paymentStatus !== "PAID") {
      return { success: false, error: "Only paid attendees can be refunded" };
    }

    if (!attendee.stripeSessionId) {
      return {
        success: false,
        error: "No Stripe session found for this attendee",
      };
    }

    // // Retrieve the checkout session to get the payment intent
    // const session = await stripe.checkout.sessions.retrieve(
    //   attendee.stripeSessionId
    // );

    // const paymentIntentId =
    //   typeof session.payment_intent === "string"
    //     ? session.payment_intent
    //     : session.payment_intent?.id;

    // if (!paymentIntentId) {
    //   return { success: false, error: "No payment intent found" };
    // }

    // Create Stripe refund
    // await stripe.refunds.create({
    //   payment_intent: paymentIntentId,
    // });

    // Update attendee payment status and store reason
    await prisma.eventAttendee.update({
      where: { id: attendeeId },
      data: {
        paymentStatus: "REFUNDED",
        note: reason || null,
      },
    });

    // Get event details for the refund email
    const event = await prisma.event.findUnique({
      where: { id: attendee.eventId },
    });

    // Send refund confirmation email to attendee
    if (event) {
      const refundAmount = attendee.amountPaid
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(Number(attendee.amountPaid))
        : "Full refund";

      await sendRefundConfirmationEmail({
        attendeeName: attendee.name,
        attendeeEmail: attendee.email,
        eventTitle: event.title,
        refundAmount,
        eventId: event.id,
        reason: reason || undefined,
      });
    }

    revalidatePath(`/admin/events/${event?.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error refunding attendee:", error);
    return { success: false, error: "Failed to process refund" };
  }
}

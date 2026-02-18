import { Prisma } from "@prisma/client";
import {
  AdminCustomEmail,
  EventRegistrationConfirmation,
  EventRegistrationNotification,
  RefundConfirmationEmail,
} from "./email";
import { prisma } from "./prisma";
import { resend } from "./resend";

type EventWithRelations = Prisma.EventGetPayload<{
  include: { media: true; attendees: true };
}>;

interface SendEventRegistrationEmailParams {
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  event: EventWithRelations;
}

export async function sendEventConfirmationEmail({
  attendeeName,
  attendeeEmail,
  event,
}: Omit<SendEventRegistrationEmailParams, "attendeePhone">) {
  try {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const { data, error } = await resend.emails.send({
      from: "Innovare HP <info@notifications.innovarehp.com>",
      to: [attendeeEmail],
      subject: `Registration Confirmed: ${event.title}`,
      react: EventRegistrationConfirmation({
        attendeeName,
        eventTitle: event.title,
        eventDescription: event.description,
        eventStartDate: formatDate(event.eventStartDate),
        eventEndDate: event.eventEndDate
          ? formatDate(event.eventEndDate)
          : undefined,
        location: event.location,
        eventId: event.id,
        slug: event.slug,
      }),
    });

    if (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendEventRegistrationNotificationEmail({
  attendeeName,
  attendeeEmail,
  attendeePhone,
  event,
}: SendEventRegistrationEmailParams) {
  try {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const { data, error } = await resend.emails.send({
      from: "Innovare HP <info@notifications.innovarehp.com>",
      to: ["info@innovarehp.com"],
      subject: `New Registration: ${event.title}`,
      react: EventRegistrationNotification({
        attendeeName,
        attendeeEmail,
        attendeePhone,
        eventTitle: event.title,
        eventStartDate: formatDate(event.eventStartDate),
        totalAttendees: event.attendees.length,
        eventId: event.id,
        slug: event.slug,
      }),
    });

    if (error) {
      console.error("Error sending admin notification:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return { success: false, error };
  }
}

export async function sendEventRegistrationEmails(
  params: SendEventRegistrationEmailParams
) {
  const results = await Promise.allSettled([
    sendEventConfirmationEmail(params),
    sendEventRegistrationNotificationEmail(params),
  ]);

  const [confirmationResult, notificationResult] = results;

  return {
    confirmation:
      confirmationResult.status === "fulfilled"
        ? confirmationResult.value
        : { success: false, error: confirmationResult.reason },
    notification:
      notificationResult.status === "fulfilled"
        ? notificationResult.value
        : { success: false, error: notificationResult.reason },
  };
}

export async function getEventForEmail(eventId: string) {
  return await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      media: true,
      attendees: true,
    },
  });
}

export async function sendRefundConfirmationEmail({
  attendeeName,
  attendeeEmail,
  eventTitle,
  refundAmount,
  eventId,
  reason,
}: {
  attendeeName: string;
  attendeeEmail: string;
  eventTitle: string;
  refundAmount: string;
  eventId: string;
  reason?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Innovare HP <info@notifications.innovarehp.com>",
      to: [attendeeEmail],
      subject: `Refund Processed: ${eventTitle}`,
      react: RefundConfirmationEmail({
        attendeeName,
        eventTitle,
        refundAmount,
        eventId,
        reason,
      }),
    });

    if (error) {
      console.error("Error sending refund confirmation email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send refund confirmation email:", error);
    return { success: false, error };
  }
}

export async function sendAdminCustomEmail({
  recipients,
  recipientNames,
  subject,
  message,
  eventTitle,
  eventDate,
  eventLocation,
  eventId,
  slug,
}: {
  recipients: string[];
  recipientNames: string[];
  subject: string;
  message: string;
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
  eventId?: string;
  slug: string;
}) {
  try {
    const results = await Promise.allSettled(
      recipients.map((email, index) =>
        resend.emails.send({
          from: "Innovare HP <info@notifications.innovarehp.com>",
          to: email,
          subject,
          react: AdminCustomEmail({
            recipientName: recipientNames[index] || "Attendee",
            subject,
            message,
            eventTitle,
            eventDate,
            eventLocation,
            eventId,
            slug,
          }),
        })
      )
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;
    return {
      success: failed === 0,
      successful,
      failed,
      results,
    };
  } catch (error) {
    console.error("Failed to send admin custom emails:", error);
    return { success: false, error };
  }
}

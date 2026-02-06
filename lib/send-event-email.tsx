import { Prisma } from "@prisma/client";
import {
  AdminCustomEmail,
  EventRegistrationConfirmation,
  EventRegistrationNotification,
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
      from: "Innovare HP <hello@innovarehp.com>",
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
      }),
    });

    if (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false, error };
    }

    console.log("Confirmation email sent:", data);
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
      from: "Innovare HP <hello@innovarehp.com>",
      to: ["info@innovarehp.com", "hello@innovarehp.com"],
      subject: `New Registration: ${event.title}`,
      react: EventRegistrationNotification({
        attendeeName,
        attendeeEmail,
        attendeePhone,
        eventTitle: event.title,
        eventStartDate: formatDate(event.eventStartDate),
        totalAttendees: event.attendees.length,
        maxGuests: event.maxGuests,
        eventId: event.id,
      }),
    });

    if (error) {
      console.error("Error sending admin notification:", error);
      return { success: false, error };
    }

    console.log("Admin notification sent:", data);
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

export async function sendAdminCustomEmail({
  recipients,
  recipientNames,
  subject,
  message,
  eventTitle,
  eventDate,
  eventLocation,
}: {
  recipients: string[];
  recipientNames: string[];
  subject: string;
  message: string;
  eventTitle?: string;
  eventDate?: string;
  eventLocation?: string;
}) {
  try {
    const results = await Promise.allSettled(
      recipients.map((email, index) =>
        resend.emails.send({
          from: "Innovare HP <hello@innovarehp.com>",
          to: email,
          subject,
          react: AdminCustomEmail({
            recipientName: recipientNames[index] || "Attendee",
            subject,
            message,
            eventTitle,
            eventDate,
            eventLocation,
          }),
        })
      )
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;
    console.log(
      `Admin custom emails sent: ${successful} successful, ${failed} failed`
    );
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

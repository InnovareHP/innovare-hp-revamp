"use server";

import { Prisma } from "@/generated/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { sendAdminCustomEmail } from "@/lib/send-event-email";
import { formatDate } from "@/lib/utils";
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
  }>
> {
  try {
    await requireAdmin();
    const offset = (page - 1) * limit;

    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        include: {
          media: true,
          _count: {
            select: {
              attendees: true, // 👈 relation name
            },
          },
        },
        orderBy: {
          eventStartDate: "asc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.event.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const formattedEvents = events.map((event) => ({
      ...event,
      totalAttendees: event._count.attendees,
      _count: undefined, // optional cleanup
    }));

    return {
      success: true,
      data: {
        events: formattedEvents as any,
        totalPages,
        page,
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

    revalidatePath("/admin/events");
    return { success: true, data: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: "Failed to create event" };
  }
};

export const deleteEvent = async (ids: string[]) => {
  try {
    await requireAdmin();
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

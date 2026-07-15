"use server";

import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { sendEventRegistrationEmails } from "@/lib/send-event-email";
import {
  createTeamsMeeting,
  deleteTeamsMeeting,
  updateTeamsMeeting,
} from "@/lib/teams";
import { validateWithRetry } from "@/lib/turnstile";
import { EventStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function getEvents(
): Promise<
  ActionResponse<{
    upcomingEvents: Prisma.EventGetPayload<{
      include: { media: true; expectations: true };
    }>[];
    pastEvents: Prisma.EventGetPayload<{
      include: { media: true; expectations: true };
    }>[];
  }>
> {
  try {
    const now = new Date();
    const visibleStatuses = [EventStatus.PUBLISHED, EventStatus.COMPLETED];

    const [upcomingEvents, pastEvents] = await prisma.$transaction([
      prisma.event.findMany({
        include: {
          media: true,
          attendees: true,
          guests: true,
          expectations: true,
        },
        where: {
          status: {
            in: visibleStatuses,
          },
          OR: [
            {
              eventEndDate: {
                gte: now,
              },
            },
            {
              eventEndDate: null,
              eventStartDate: {
                gte: now,
              },
            },
          ],
        },
        orderBy: {
          eventStartDate: "asc",
        },
      }),
      prisma.event.findMany({
        include: {
          media: true,
          attendees: true,
          guests: true,
          expectations: true,
        },
        where: {
          status: {
            in: visibleStatuses,
          },
          OR: [
            {
              eventEndDate: {
                lt: now,
              },
            },
            {
              eventEndDate: null,
              eventStartDate: {
                lt: now,
              },
            },
          ],
        },
        orderBy: {
          eventStartDate: "desc",
        },
      }),
    ]);

    // Convert Decimal fields to plain numbers for client component serialization
    const serializeEvents = (
      events: Prisma.EventGetPayload<{
        include: { media: true; attendees: true; guests: true; expectations: true };
      }>[]
    ) =>
      events.map((event) => ({
      ...event,
        price: event.price ? Number(event.price) : null,
        attendees: event.attendees.map((attendee) => ({
          ...attendee,
          amountPaid: attendee.amountPaid ? Number(attendee.amountPaid) : null,
        })),
      }));

    return {
      success: true,
      data: {
        upcomingEvents: serializeEvents(upcomingEvents) as typeof upcomingEvents,
        pastEvents: serializeEvents(pastEvents) as typeof pastEvents,
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      success: false,
      error: "Failed to fetch events",
    };
  }
}

export const getEventById = async (
  id: string
): Promise<
  ActionResponse<
    Prisma.EventGetPayload<{
      include: {
        media: true;
        attendees: true;
        guests: true;
        expectations: true;
      };
    }>
  >
> => {
  try {
    if (!id) {
      return { success: false, error: "Event ID is required" };
    }

    const event = await prisma.event.findUnique({
      where: { slug: id },
      include: {
        media: true,
        attendees: true,
        guests: true,
        expectations: true,
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    // Convert Decimal fields to plain numbers for client component serialization
    const serializedEvent = {
      ...event,
      price: event.price ? Number(event.price) : null,
      attendees: event.attendees.map((attendee) => ({
        ...attendee,
        amountPaid: attendee.amountPaid ? Number(attendee.amountPaid) : null,
      })),
    };

    return { success: true, data: serializedEvent as typeof event };
  } catch (error) {
    console.error("Error fetching event:", error);
    return {
      success: false,
      error: "Failed to fetch event",
    };
  }
};

export async function createEvent(
  event: Omit<Prisma.EventCreateInput, "media"> & { mediaId?: string }
): Promise<ActionResponse<{ id: string }>> {
  try {
    // Require authentication
    await requireAuth();

    if (!event.title || !event.description || !event.eventStartDate) {
      return {
        success: false,
        error: "Title, description, and event start date are required",
      };
    }
    const startDate = new Date(event.eventStartDate);
    if (isNaN(startDate.getTime())) {
      return { success: false, error: "Invalid event start date" };
    }

    if (event.eventEndDate) {
      const endDate = new Date(event.eventEndDate);
      if (isNaN(endDate.getTime())) {
        return { success: false, error: "Invalid event end date" };
      }
      if (endDate < startDate) {
        return {
          success: false,
          error: "Event end date must be after start date",
        };
      }
    }

    const newEvent = await prisma.event.create({
      data: event,
    });

    return { success: true, data: { id: newEvent.id } };
  } catch (error) {
    console.error("Error creating event:", error);
    if ((error as Error).message === "Unauthorized: Authentication required") {
      return { success: false, error: "Authentication required" };
    }
    return {
      success: false,
      error: "Failed to create event",
    };
  }
}

export async function deleteEvent(id: string): Promise<ActionResponse> {
  try {
    await requireAuth();

    if (!id) {
      return { success: false, error: "Event ID is required" };
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return { success: false, error: "Event not found" };
    }

    await prisma.event.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    if ((error as Error).message === "Unauthorized: Authentication required") {
      return { success: false, error: "Authentication required" };
    }
    return {
      success: false,
      error: "Failed to delete event",
    };
  }
}

export async function updateEvent(
  id: string,
  event: Prisma.EventUpdateInput
): Promise<ActionResponse> {
  try {
    await requireAuth();

    if (!id) {
      return { success: false, error: "Event ID is required" };
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id },
      include: { expectations: true },
    });

    if (!existingEvent) {
      return { success: false, error: "Event not found" };
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: event,
    });

    // Handle Teams meeting lifecycle when eventType changes
    const newType = (event.eventType as string) ?? existingEvent.eventType;
    const wasVirtual = existingEvent.eventType === "VIRTUAL";
    const isNowVirtual = newType === "VIRTUAL";

    try {
      if (!wasVirtual && isNowVirtual) {
        // Switched to VIRTUAL — create a new Teams meeting
        const meeting = await createTeamsMeeting({
          title: updatedEvent.title,
          startDate: updatedEvent.eventStartDate,
          endDate: updatedEvent.eventEndDate,
        });
        await prisma.event.update({
          where: { id },
          data: {
            teamsMeetingId: meeting.meetingId,
            teamsMeetingUrl: meeting.joinUrl,
          },
        });
      } else if (wasVirtual && !isNowVirtual) {
        // Switched away from VIRTUAL — delete the Teams meeting
        if (existingEvent.teamsMeetingId) {
          await deleteTeamsMeeting(existingEvent.teamsMeetingId);
        }
        await prisma.event.update({
          where: { id },
          data: { teamsMeetingId: null, teamsMeetingUrl: null },
        });
      } else if (wasVirtual && isNowVirtual && existingEvent.teamsMeetingId) {
        // Still VIRTUAL — sync title/dates with the existing Teams meeting
        await updateTeamsMeeting(existingEvent.teamsMeetingId, {
          title: updatedEvent.title,
          startDate: updatedEvent.eventStartDate,
          endDate: updatedEvent.eventEndDate,
        });
      }
    } catch (teamsError) {
      console.error("Teams meeting sync failed:", teamsError);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    if ((error as Error).message === "Unauthorized: Authentication required") {
      return { success: false, error: "Authentication required" };
    }
    return {
      success: false,
      error: "Failed to update event",
    };
  }
}

export async function joinEvent(
  eventId: string,
  attendeeData: { name: string; email: string; phone: string; organization: string },
  turnstileToken: string
): Promise<ActionResponse> {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("cf-connecting-ip") ??
      headersList.get("x-forwarded-for")?.split(",")[0] ??
      undefined;
    const verification = await validateWithRetry(turnstileToken, ip);
    if (!verification?.success) {
      console.error("Turnstile failed:", verification);
      return { success: false };
    }
    if (!eventId) {
      return { success: false, error: "Event ID is required" };
    }

    if (
      !attendeeData.name ||
      !attendeeData.email ||
      !attendeeData.phone ||
      !attendeeData.organization?.trim()
    ) {
      return {
        success: false,
        error: "Name, email, phone, and organization are required",
      };
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendees: true,
        media: true,
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    if (event.status !== EventStatus.PUBLISHED) {
      return { success: false, error: "Registration is not available for this event" };
    }

    const existingAttendee = await prisma.eventAttendee.findFirst({
      where: {
        eventId,
        email: attendeeData.email,
      },
    });

    if (existingAttendee) {
      return {
        success: false,
        error: "You are already registered for this event",
      };
    }

    if (event.registrationDeadline) {
      const now = new Date();
      if (now > event.registrationDeadline) {
        return { success: false, error: "Registration deadline has passed" };
      }
    }

    const eventCutoffDate = event.eventEndDate ?? event.eventStartDate;
    if (new Date() > eventCutoffDate) {
      return { success: false, error: "This event has already ended" };
    }

    const newAttendee = await prisma.eventAttendee.create({
      data: {
        eventId,
        name: attendeeData.name,
        email: attendeeData.email,
        phone: attendeeData.phone,
        organization: attendeeData.organization.trim(),
      },
    });

    await sendEventRegistrationEmails({
      attendeeName: attendeeData.name,
      attendeeEmail: attendeeData.email,
      attendeePhone: attendeeData.phone,
      event: {
        ...event,
        attendees: [...event.attendees, newAttendee],
        media: event.media ?? null,
        slug: event.slug,
      },
    });

    revalidatePath(`/events/${event.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error joining event:", error);
    if ((error as Error).message === "Unauthorized: Authentication required") {
      return { success: false, error: "Authentication required" };
    }
    return {
      success: false,
      error: "Failed to join event",
    };
  }
}

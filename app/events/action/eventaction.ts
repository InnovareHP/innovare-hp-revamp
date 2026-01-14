"use server";

import { Prisma } from "@/generated/prisma/client";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { sendEventRegistrationEmails } from "@/lib/send-event-email";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function getEvents(
  limit: number = 10,
  page: number = 1
): Promise<
  ActionResponse<{
    events: Prisma.EventGetPayload<{ include: { media: true } }>[];
    totalPages: number;
    page: number;
  }>
> {
  try {
    const offset = (page - 1) * limit;
    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        include: {
          media: true,
          attendees: true,
          guests: true,
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

    return { success: true, data: { events, totalPages, page } };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      success: false,
      error: "Failed to fetch events",
    };
  }
}

export async function getEventById(
  id: string
): Promise<
  ActionResponse<Prisma.EventGetPayload<{ include: { media: true } }>>
> {
  try {
    if (!id) {
      return { success: false, error: "Event ID is required" };
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        media: true,
        attendees: true,
        guests: true,
      },
    });

    if (!event) {
      return { success: false, error: "Event not found" };
    }

    return { success: true, data: event };
  } catch (error) {
    console.error("Error fetching event:", error);
    return {
      success: false,
      error: "Failed to fetch event",
    };
  }
}

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
    });

    if (!existingEvent) {
      return { success: false, error: "Event not found" };
    }

    if (event.eventStartDate && event.eventEndDate) {
      const startDate = new Date(event.eventStartDate as Date);
      const endDate = new Date(event.eventEndDate as Date);

      if (endDate < startDate) {
        return {
          success: false,
          error: "Event end date must be after start date",
        };
      }
    }

    await prisma.event.update({
      where: { id },
      data: event,
    });

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
  attendeeData: { name: string; email: string; phone: string }
): Promise<ActionResponse> {
  try {
    if (!eventId) {
      return { success: false, error: "Event ID is required" };
    }

    if (!attendeeData.name || !attendeeData.email || !attendeeData.phone) {
      return {
        success: false,
        error: "Name, email, and phone are required",
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

    if (event.maxGuests > 0 && event.attendees.length >= event.maxGuests) {
      return { success: false, error: "Event has reached maximum capacity" };
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

    await prisma.eventAttendee.create({
      data: {
        eventId,
        name: attendeeData.name,
        email: attendeeData.email,
        phone: attendeeData.phone,
      },
    });

    await sendEventRegistrationEmails({
      attendeeName: attendeeData.name,
      attendeeEmail: attendeeData.email,
      attendeePhone: attendeeData.phone,
      event: {
        ...event,
        media: event.media ?? null,
      },
    });

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

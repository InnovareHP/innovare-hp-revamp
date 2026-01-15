"use server";

import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
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
    events: Prisma.EventGetPayload<{ include: { media: true } }>[];
    totalPages: number;
    page: number;
  }>
> {
  try {
    // await requireAuth();

    const offset = (page - 1) * limit;
    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        include: {
          media: true,
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
    return { success: false, error: "Failed to fetch events" };
  }
}

export const createEvent = async (event: Prisma.EventCreateInput) => {
  try {
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

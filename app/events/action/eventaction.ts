import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function getEvents() {
  return await prisma.event.findMany({
    include: {
      media: true,
    },
  });
}

export async function createEvent(
  event: Prisma.EventCreateManyInput,
  media: Prisma.MediaCreateManyInput
) {
  const newEvent = await prisma.event.create({
    data: event,
  });

  await prisma.media.create({
    data: media,
  });

  return newEvent;
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id },
  });
}

export async function updateEvent(id: string, event: Prisma.EventUpdateInput) {
  await prisma.event.update({
    where: { id },
    data: event,
  });
}

export async function joinEvent(
  eventAttendee: Prisma.EventAttendeeCreateInput
) {
  await prisma.eventAttendee.create({
    data: eventAttendee,
  });
}

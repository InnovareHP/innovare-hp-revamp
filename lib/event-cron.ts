import { prisma } from "@/lib/prisma";
import { EventStatus } from "@prisma/client";

type SyncPastEventsResult = {
  updated: number;
  checkedAt: string;
};

export async function syncPastEvents(): Promise<SyncPastEventsResult> {
  const now = new Date();

  const result = await prisma.event.updateMany({
    where: {
      status: EventStatus.PUBLISHED,
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
    data: {
      status: EventStatus.COMPLETED,
    },
  });

  return {
    updated: result.count,
    checkedAt: now.toISOString(),
  };
}

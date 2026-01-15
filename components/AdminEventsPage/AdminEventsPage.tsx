"use client";

import { EventStatus, Prisma } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import ReusableTable, { ColumnDef } from "../ReusableTable/ReusableTable";
import { Button } from "../ui/button";

type EventsResponse = {
  events: Prisma.EventGetPayload<{ include: { media: true } }>[];
  totalPages: number;
  page: number;
};

export default function AdminEventPage({
  events,
}: {
  events: Promise<EventsResponse>;
}) {
  const { events: eventsData, totalPages, page } = use(events);

  const columns: ColumnDef<
    Prisma.EventGetPayload<{ include: { media: true } }>
  >[] = [
    {
      key: "title",
      header: "Title",
      cell: (event) => (
        <Link
          href={`/admin/events/${event.id}`}
          className="font-medium text-blue-500 hover:text-blue-600 underline"
        >
          {event.title}
        </Link>
      ),
    },
    {
      key: "eventStartDate",
      header: "Date",
      cell: (event) => format(new Date(event.eventStartDate), "PPP"),
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "status",
      header: "Status",
      cell: (event) => (
        <span
          className={cn(
            "inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium",
            event.status === EventStatus.PUBLISHED
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
          )}
        >
          {event.status}
        </span>
      ),
    },
    {
      key: "maxGuests",
      header: "Max Guests",
      align: "right",
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      cell: (event) => (
        <div className="flex justify-end gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/events/${event.id}`}>View</Link>
          </Button>
          <Button size="sm">
            <PencilIcon className="w-4 h-4" />
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            <TrashIcon className="w-4 h-4" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="w-full overflow-hidden border rounded-xl bg-card text-card-foreground shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Events Table
          </h3>
        </div>

        <div className="overflow-x-auto">
          <ReusableTable
            data={eventsData}
            columns={columns}
            itemsPerPage={10}
            totalPages={totalPages}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
}

"use client";

import { deleteEvent } from "@/app/admin/events/action";
import { EventFormValues } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { EventStatus, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { toast } from "sonner";
import ReusableTable, { ColumnDef } from "../ReusableTable/ReusableTable";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import AddEventButton from "./AddEventButton";
import RemoveEvent from "./RemoveEvent";

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

  const handleDelete = async (ids: string[]) => {
    try {
      await deleteEvent(ids);
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEvents(new Set(eventsData.map((event) => event.id)));
    } else {
      setSelectedEvents(new Set());
    }
  };

  const handleSelectEvent = (eventId: string, checked: boolean) => {
    const newSelected = new Set(selectedEvents);
    if (checked) {
      newSelected.add(eventId);
    } else {
      newSelected.delete(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const isAllSelected =
    eventsData.length > 0 && selectedEvents.size === eventsData.length;
  const isIndeterminate =
    selectedEvents.size > 0 && selectedEvents.size < eventsData.length;

  const columns: ColumnDef<
    Prisma.EventGetPayload<{ include: { media: true } }>
  >[] = [
    {
      key: "checkbox",
      header: (
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate;
          }}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer accent-blue-600"
        />
      ),
      align: "center",
      cell: (event) => (
        <input
          type="checkbox"
          checked={selectedEvents.has(event.id)}
          onChange={(e) => handleSelectEvent(event.id, e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer accent-blue-600"
        />
      ),
    },
    {
      key: "title",
      header: "Title",
      cell: (event) => (
        <Link
          href={`/admin/events/${event.slug}`}
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
      key: "attendees",
      header: "Attendees",
      cell: (event) => (event as any).totalAttendees ?? 0,
    },
    {
      key: "price",
      header: "Price",
      align: "right",
      cell: (event) =>
        event.isPaid && Number(event.price) > 0 ? (
          <Badge variant="secondary" className="text-xs">
            ${Number(event.price).toFixed(2)}
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-green-600 border-green-300 text-xs"
          >
            Free
          </Badge>
        ),
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
          <AddEventButton
            type="edit"
            event={event as unknown as EventFormValues & { id: string }}
          />
          <RemoveEvent onRemove={() => handleDelete([event.id])} />
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
          {selectedEvents.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedEvents.size} event
                {selectedEvents.size !== 1 ? "s" : ""} selected
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  handleDelete(Array.from(selectedEvents) as string[])
                }
              >
                <TrashIcon className="w-4 h-4" />
                Delete Selected
              </Button>
            </div>
          )}
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

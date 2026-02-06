"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { use } from "react";

type EventsResponse = {
  events: Prisma.EventGetPayload<{ include: { media: true } }>[];
  totalPages: number;
  page: number;
};

const EventsPage = ({ events }: { events: Promise<EventsResponse> }) => {
  const { events: eventsData, totalPages, page } = use(events);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {eventsData.length > 0 ? (
          eventsData.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex flex-col cursor-pointer"
            >
              <Card className="border-none shadow-none bg-transparent mb-5 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={event.media?.url ?? ""}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-5">
                <div className="flex flex-col items-center min-w-[45px]">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    {format(event.eventStartDate, "MMM")}
                  </span>
                  <span className="text-3xl font-black text-slate-900 leading-none">
                    {format(event.eventStartDate, "dd")}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                    <span className="uppercase tracking-wide">
                      {format(event.eventStartDate, "h:mm a")} -{" "}
                      {format(event.eventEndDate ?? new Date(), "h:mm a")}
                    </span>
                    {event.qrCode && (
                      <ExternalLink className="w-3 h-3 text-primary" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground/80">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground text-2xl font-bold">
            No events found
          </div>
        )}
      </div>

      {/* Pagination (server-driven) */}
      {totalPages > 1 && (
        <Pagination className="mt-14">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page - 1}`}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`?page=${pageNumber}`}
                    isActive={pageNumber === page}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href={`?page=${page + 1}`}
                aria-disabled={page === totalPages}
                className={
                  page === totalPages ? "pointer-events-none opacity-40" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default EventsPage;

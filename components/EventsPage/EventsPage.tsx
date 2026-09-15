"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDay, formatMonth, formatTime } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ArrowUpRight, MapPin, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type EventRecord = Prisma.EventGetPayload<{ include: { media: true } }>;

type EventsResponse = {
  upcomingEvents: EventRecord[];
  pastEvents: EventRecord[];
};

const tabTriggerClass =
  "rounded-full px-5 py-2 text-sm font-medium text-ink transition-colors data-[state=active]:bg-brand data-[state=active]:text-white sm:text-base";

const EventCard = ({ event }: { event: EventRecord }) => (
  <li>
    <Link
      href={`/events/${event.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-surface-1 no-underline transition-shadow duration-300 hover:shadow-[0_0_20px_0_rgba(35,35,35,0.1)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-3">
        {event.media?.url ? (
          <Image
            src={event.media.url}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start gap-5">
          <div className="flex min-w-[54px] flex-col items-center">
            <span className="text-[13px] tracking-[0.05em] text-brand uppercase">
              {formatMonth(event.eventStartDate)}
            </span>
            <span className="text-[40px] leading-none font-bold text-brand">
              {formatDay(event.eventStartDate)}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="line-clamp-3 text-xl leading-[1.25] font-semibold text-ink transition-colors group-hover:text-brand sm:text-2xl">
              {event.title}
              {event.hostedBy ? ` — ${event.hostedBy}` : ""}
            </h3>
            <p className="mt-1 text-sm text-ink-muted sm:text-base">
              {formatTime(event.eventStartDate)}
            </p>
          </div>

          <ArrowUpRight
            aria-hidden
            className="mt-1 size-4 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={2.4}
          />
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-hairline pt-4">
          <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm text-ink-muted">
            {event.eventType === "VIRTUAL" ? (
              <Monitor aria-hidden className="size-4 shrink-0" />
            ) : (
              <MapPin aria-hidden className="size-4 shrink-0" />
            )}
            <span className="truncate">{event.location}</span>
          </span>

          <span
            className={`inline-flex h-7 shrink-0 items-center rounded-full px-3 text-[13px] font-medium ${
              event.isPaid
                ? "bg-brand text-white"
                : "border border-hairline bg-white text-brand"
            }`}
          >
            {event.isPaid ? `$${Number(event.price).toFixed(2)}` : "Free"}
          </span>
        </div>
      </div>
    </Link>
  </li>
);

const EmptyState = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-[20px] border border-dashed border-hairline bg-surface-1 px-6 py-12 text-center text-base text-ink-muted sm:text-lg">
    {children}
  </p>
);

const EventsPage = ({ events }: { events: Promise<EventsResponse> }) => {
  const { upcomingEvents, pastEvents } = use(events);
  const defaultView = upcomingEvents.length > 0 ? "upcoming" : "past";

  return (
    <Tabs defaultValue={defaultView} className="gap-10">
      <TabsList className="h-auto w-fit rounded-full border border-hairline bg-white p-1">
        <TabsTrigger value="upcoming" className={tabTriggerClass}>
          Upcoming ({upcomingEvents.length})
        </TabsTrigger>
        <TabsTrigger value="past" className={tabTriggerClass}>
          Past ({pastEvents.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-8">
        <div>
          <h2 className="text-[clamp(1.5rem,3.6vw,2.25rem)] leading-[1.2] font-semibold text-ink">
            Upcoming <span className="text-brand">events</span>
          </h2>
          <p className="mt-3 max-w-[433px] text-base leading-[25px] text-ink sm:text-lg">
            Current and upcoming gatherings you can still plan around.
          </p>
        </div>

        {upcomingEvents.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <EmptyState>No upcoming events right now.</EmptyState>
        )}
      </TabsContent>

      <TabsContent value="past" className="space-y-8">
        <div>
          <h2 className="text-[clamp(1.5rem,3.6vw,2.25rem)] leading-[1.2] font-semibold text-ink">
            Past <span className="text-brand">events</span>
          </h2>
          <p className="mt-3 max-w-[433px] text-base leading-[25px] text-ink sm:text-lg">
            Recent gatherings stay here after they wrap up.
          </p>
        </div>

        {pastEvents.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <EmptyState>
            Past events will appear here once activities have wrapped up.
          </EmptyState>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EventsPage;

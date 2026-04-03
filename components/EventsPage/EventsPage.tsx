"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatTime } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { DollarSign, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type EventsResponse = {
  upcomingEvents: Prisma.EventGetPayload<{ include: { media: true } }>[];
  pastEvents: Prisma.EventGetPayload<{ include: { media: true } }>[];
};

const EventsPage = ({ events }: { events: Promise<EventsResponse> }) => {
  const { upcomingEvents, pastEvents } = use(events);
  const defaultView = upcomingEvents.length > 0 ? "upcoming" : "past";

  const renderEventCard = (
    event: Prisma.EventGetPayload<{ include: { media: true } }>
  ) => (
    <Link
      key={event.id}
      href={`/events/${event.slug}`}
      className="group flex flex-col cursor-pointer"
    >
      <Card className="border-none shadow-none bg-transparent mb-5 overflow-hidden border-2">
        <CardContent className="p-0 w-full">
          <div className="overflow-hidden rounded-2xl bg-muted">
            {event.media?.url && (
              <Image
                src={event.media?.url ?? ""}
                alt={event.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-5">
        <div className="flex flex-col items-center min-w-[45px]">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {formatDate(event.eventStartDate).split(" ")[1]}
          </span>
          <span className="text-3xl font-black text-slate-900 leading-none">
            {formatDate(event.eventStartDate).split(" ")[2]}
          </span>
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
            <span className="uppercase tracking-wide">
              {formatTime(event.eventStartDate)}
            </span>
            {event.qrCode && (
              <ExternalLink className="w-3 h-3 text-primary" aria-hidden />
            )}
          </div>

          <h3 className="text-base font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
            {event.title} {event.hostedBy && `- ${event.hostedBy}`}
          </h3>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.isPaid ? (
              <Badge
                variant="secondary"
                className="gap-0.5 text-[10px] px-1.5 py-0"
              >
                <DollarSign className="w-2.5 h-2.5" />
                {Number(event.price).toFixed(2)}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-green-600 border-green-300 text-[10px] px-1.5 py-0"
              >
                Free
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue={defaultView} className="space-y-8">
        <div className="flex justify-start">
          <TabsList className="grid h-auto w-full max-w-sm grid-cols-2">
            <TabsTrigger value="upcoming" className="px-4 py-2">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="px-4 py-2">
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              Upcoming <span className="text-primary">Events</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Current and upcoming activities you can still plan around.
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(renderEventCard)}
            </div>
          ) : (
            <div className="rounded-2xl border bg-background px-6 py-10 text-center text-muted-foreground">
              No upcoming events right now.
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              Past <span className="text-primary">Events</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Recent activities remain available here after they finish.
            </p>
          </div>

          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map(renderEventCard)}
            </div>
          ) : (
            <div className="rounded-2xl border bg-background px-6 py-10 text-center text-muted-foreground">
              Past events will appear here once activities have wrapped up.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;

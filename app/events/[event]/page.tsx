import { getEventById } from "@/app/events/action/eventaction";
import EventDetailClient from "@/components/EventDetail/EventDetailClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EventWithRelations = Prisma.EventGetPayload<{
  include: { media: true; attendees: true; guests: true };
}>;

interface EventPageProps {
  params: Promise<{
    event: string;
  }>;
}

const EventPage = async ({ params }: EventPageProps) => {
  const { event: eventId } = await params;
  const response = await getEventById(eventId);

  if (!response.success || !response.data) {
    notFound();
  }

  const event = response.data;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🎥 Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/FREE VIDEO People Talking _ Free Talking Video _ Free Stock Footage.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🌑 Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 📦 Page Content */}
      <div className="relative z-10 px-4 lg:px-20 py-8 bg-transparent backdrop-blur-sm">
        <Card className="overflow-hidden shadow-xl border-0 bg-blue-50/90 backdrop-blur">
          <Link href="/events">
            <Button variant="secondary" className="m-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </Link>
          {event.media && (
            <div className="relative w-full h-72 md:h-[200px] overflow-hidden">
              <img
                src={event.media.url}
                alt={event.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <EventDetailClient event={event as EventWithRelations} />
        </Card>
      </div>
    </div>
  );
};

export default EventPage;

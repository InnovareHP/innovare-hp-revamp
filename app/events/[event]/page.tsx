import { getEventById } from "@/app/events/action/eventaction";
import EventDetailClient from "@/components/EventDetail/EventDetailClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Prisma } from "@/generated/prisma";
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/events">
          <Button variant="outline" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </Link>

        <Card className="overflow-hidden">
          {event.media && (
            <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/5">
              {event.media.type === "image" ? (
                <img
                  src={event.media.url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Event Media</p>
                </div>
              )}
            </div>
          )}

          <CardHeader className="border-b">
            <EventDetailClient event={event as EventWithRelations} />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default EventPage;

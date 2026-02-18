import { getEventById } from "@/app/events/action/eventaction";
import EventDetailClient from "@/components/EventDetail/EventDetailClient";
import InteractiveBackground from "@/components/EventsPage/InteractiveBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  const response = await getEventById(decodeURIComponent(eventId));

  if (!response.success || !response.data) {
    notFound();
  }

  const event = response.data;

  return (
    <div className="min-h-screen overflow-hidden">
      <InteractiveBackground />

      <div className="absolute inset-0 bg-black/50" />

      <div className="z-10 p-4 lg:p-8 flex items-center justify-center overflow-hidden max-w-7xl mx-auto">
        <Card className="w-full max-w-5xl max-h-screen overflow-y-auto shadow-xl border-0 bg-blue-50/90 backdrop-blur flex flex-col">
          <div className="p-2 flex items-center">
            <Link href="/events">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>

          <Suspense fallback={<div>Loading event details...</div>}>
            <EventDetailClient event={event as EventWithRelations} />
          </Suspense>
        </Card>
      </div>
    </div>
  );
};
export default EventPage;

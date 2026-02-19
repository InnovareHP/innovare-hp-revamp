import { getEventById } from "@/app/events/action/eventaction";
import EventDetailClient from "@/components/EventDetail/EventDetailClient";
import InteractiveBackground from "@/components/EventsPage/InteractiveBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SITE_URL = "https://innovarehp.com";

type EventWithRelations = Prisma.EventGetPayload<{
  include: { media: true; attendees: true; guests: true; expectations: true };
}>;

interface EventPageProps {
  params: Promise<{
    event: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { event: slug } = await params;
  const response = await getEventById(decodeURIComponent(slug));

  if (!response.success || !response.data) {
    return {
      title: "Event Not Found",
      description: "This event could not be found.",
    };
  }

  const event = response.data;
  const eventUrl = `${SITE_URL}/events/${event.slug}`;
  const ogImage = event.media?.url ?? `${SITE_URL}/images/og-image.jpg`;

  const startDate = new Date(event.eventStartDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const description = `${event.description.slice(0, 150)}${event.description.length > 150 ? "..." : ""}`;

  return {
    title: event.title,
    description,
    keywords: [
      "healthcare event",
      "healthcare marketing",
      event.title,
      event.location,
    ],
    openGraph: {
      type: "article",
      url: eventUrl,
      title: `${event.title} | Innovare HP`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      publishedTime: event.createdAt.toISOString(),
      modifiedTime: event.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Innovare HP`,
      description: `${event.title} on ${startDate} at ${event.location}. ${description}`,
      images: [ogImage],
    },
    alternates: {
      canonical: eventUrl,
    },
  };
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

import { getEventById } from "@/app/events/action/eventaction";
import EventDetailClient from "@/components/EventDetail/EventDetailClient";
import Navigation from "@/components/LandingPage/Navigation/Navigation";
import FooterBar from "@/components/LandingPage/shared/FooterBar";
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
    <>
      <Navigation />

      <main
        id="main-content"
        tabIndex={-1}
        className="mt-16 bg-white lg:mt-[81px]"
      >
        <div className="hp-container pt-10">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-bold tracking-[0.02em] text-brand uppercase no-underline hover:text-brand-deep"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={2.4}
            />
            Back to events
          </Link>
        </div>

        <Suspense
          fallback={
            <p className="hp-container py-16 text-base text-ink-muted sm:text-lg">
              Loading event details&hellip;
            </p>
          }
        >
          <EventDetailClient event={event as EventWithRelations} />
        </Suspense>
      </main>

      <FooterBar />
    </>
  );
};
export default EventPage;

import EventsPage from "@/components/EventsPage/EventsPage";
import InteractiveBackground from "@/components/EventsPage/InteractiveBackground";
import Navigation from "@/components/LandingPage/Navigation/Navigation";
import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getEvents } from "./action/eventaction";

const SITE_URL = "https://innovarehp.com";

export const metadata: Metadata = {
  title: "Healthcare Marketing Events & Webinars",
  description:
    "Join Innovare HP for healthcare marketing events, webinars, and industry conferences. Stay informed about senior care, behavioral health, and clinical marketing trends.",
  keywords: [
    "healthcare marketing events",
    "healthcare webinars",
    "senior care conferences",
    "behavioral health events",
    "medical marketing seminars",
  ],
  openGraph: {
    title: "Healthcare Marketing Events & Webinars | Innovare HP",
    description:
      "Discover upcoming healthcare marketing events, conferences, and educational webinars from Innovare HP.",
    url: `${SITE_URL}/events`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Innovare HP Events Calendar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Marketing Events | Innovare HP",
    description:
      "Join us for healthcare marketing events and industry conferences.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
};

const page = async () => {
  const events = getEvents();

  return (
    <>
      <InteractiveBackground />

      <div className="relative z-10">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-10 mt-20">
          <div className="flex items-center justify-between mb-10 border-b pb-6">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                Events <span className="text-primary">Calendar</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Discover what's happening in your community.
              </p>
            </div>
            <CalendarDays className="w-8 h-8 text-primary/40" />
          </div>
          <Suspense
            fallback={
              <div className="text-center text-muted-foreground text-2xl font-bold">
                Loading...
              </div>
            }
          >
            <EventsPage
              events={Promise.resolve(
                (await events).data ?? { upcomingEvents: [], pastEvents: [] }
              )}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default page;

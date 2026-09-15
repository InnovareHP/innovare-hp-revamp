import EventsPage from "@/components/EventsPage/EventsPage";
import Navigation from "@/components/LandingPage/Navigation/Navigation";
import FooterBar from "@/components/LandingPage/shared/FooterBar";
import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getEvents } from "./action/eventaction";

const SITE_URL = "https://innovarehp.com";

export const revalidate = 60;

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
      <Navigation />

      <main id="main-content" tabIndex={-1}>
        <section
          aria-label="Events introduction"
          className="mt-16 bg-surface-2 py-16 sm:py-20 lg:mt-[81px] lg:py-[72px]"
        >
          <div className="hp-container">
            <SectionBadge number="01" className="w-fit">
              Our events
            </SectionBadge>

            <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-16">
              <h1 className="max-w-[455px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink">
                We&rsquo;re bringing healthcare communities{" "}
                <span className="text-brand">together.</span>
              </h1>
              <p className="max-w-[602px] self-center text-base leading-[25px] text-ink sm:text-lg">
                Curated gatherings designed to connect healthcare professionals,
                spark ideas, and strengthen community partnerships.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Events calendar"
          className="bg-white py-16 sm:py-20 lg:py-[72px]"
        >
          <div className="hp-container">
            <Suspense
              fallback={
                <p className="text-base text-ink-muted sm:text-lg">
                  Loading events&hellip;
                </p>
              }
            >
              <EventsPage
                events={Promise.resolve(
                  (await events).data ?? { upcomingEvents: [], pastEvents: [] }
                )}
              />
            </Suspense>
          </div>
        </section>
      </main>

      <FooterBar />
    </>
  );
};

export default page;

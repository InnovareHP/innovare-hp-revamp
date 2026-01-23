import { LinkedInPost } from "@/lib/types";
import AboutSection from "./AboutSection/AboutSection";
import ClientReviews from "./ClientReviews/ClientReviews";
import ContactPage from "./ContactSection/ContactPage";
import EventSection from "./EventSection/EventSection";
import HeroSection from "./HeroSection/HeroSection";
import MissionSection from "./MissionSection/MissionSection";
import Navigation from "./Navigation/Navigation";
import Partners from "./Partners/Partners";
import Process from "./Proces/Process";
import TeamSection from "./TeamSection/TeamSection";
import WhatWeAreTalkingAbout from "./WhatWeAreTalkingAbout/WhatWeAreTalkingAbout";
import WhatWeDo from "./WhatWeDo/WhatWeDo";
function ADABanner() {
  return (
    <div className="bg-blue-900 text-white pt-3 pb-4 sm:py-3 md:py-2.5 px-3 sm:px-4 md:px-6 min-h-[52px] sm:min-h-[52px] md:min-h-[52px] flex items-center">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-normal text-center flex-wrap">
        {/* NEW EVENTS NOTICE */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold tracking-wide">
            NEW
          </span>
          <a
            href="#events"
            className="underline hover:text-gray-200 font-medium whitespace-nowrap"
          >
            Check out our new Events feature →
          </a>
        </div>

        {/* Divider (hidden on mobile) */}
        <span className="hidden sm:inline-block mx-3 text-white/40">|</span>

        {/* ADA NOTICE */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 sm:w-4 sm:h-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>

          <span>
            We are committed to ADA compliance and aim to make our website
            accessible to all users. Email us at{" "}
            <a
              href="mailto:hello@innovarehp.com"
              className="underline hover:text-gray-200 whitespace-nowrap"
            >
              hello@innovarehp.com
            </a>{" "}
            if you encounter any issues.
          </span>
        </div>
      </div>
    </div>
  );
}

const LandingPage = async ({ posts }: { posts: Promise<LinkedInPost[]> }) => {
  return (
    <>
      <ADABanner />
      <Navigation />
      {/*sequence not yet finalized*/}
      <main id="main-content" className="relative" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <EventSection />
        <Partners />
        <Process />
        <WhatWeDo />
        <WhatWeAreTalkingAbout initialPosts={posts} />
        {/* <OtherService /> */}
        <MissionSection />
        <TeamSection />
        <ClientReviews />
        <ContactPage />
      </main>
    </>
  );
};

export default LandingPage;

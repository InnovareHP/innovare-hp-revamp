"use client";

import { LinkedInPost } from "@/lib/types";
import { useState } from "react";
import AboutSection from "./AboutSection/AboutSection";
import ClientReviews from "./ClientReviews/ClientReviews";
import ContactPage from "./ContactSection/ContactPage";
import HeroSection from "./HeroSection/HeroSection";
import MissionSection from "./MissionSection/MissionSection";
import Navigation from "./Navigation/Navigation";
import Partners from "./Partners/Partners";
import Process from "./Proces/Process";
import TeamSection from "./TeamSection/TeamSection";
import WhatWeAreTalkingAbout from "./WhatWeAreTalkingAbout/WhatWeAreTalkingAbout";
import WhatWeDo from "./WhatWeDo/WhatWeDo";

function ADABanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-[100] bg-blue-900/95 backdrop-blur-md text-white border-t border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      aria-label="Accessibility Notice"
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* ADA CONTENT */}
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-labelledby="ada-icon-title"
            className="shrink-0 text-blue-300"
          >
            <title id="ada-icon-title">ADA Compliance Information</title>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>

          <p className="text-[11px] sm:text-xs md:text-sm leading-snug">
            We are committed to ADA compliance and aim to make our website
            accessible to all users. Email us at{" "}
            <a
              href="mailto:hello@innovarehp.com"
              className="underline font-medium hover:text-blue-200 transition-colors"
              aria-label="Send an email to hello@innovarehp.com (opens email application)"
            >
              hello@innovarehp.com
            </a>{" "}
            if you encounter any issues.
          </p>
        </div>

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded-lg transition-colors group shrink-0"
          aria-label="Close accessibility notice"
        >
          <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100">
            Close
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-labelledby="close-btn-title"
          >
            <title id="close-btn-title">Close icon</title>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

const LandingPage = ({ posts }: { posts: Promise<LinkedInPost[]> }) => {
  return (
    <>
      <Navigation />
      <main id="main-content" className="relative pb-16 md:pb-12" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <Partners />
        <Process />
        <WhatWeDo />
        <WhatWeAreTalkingAbout initialPosts={posts} />
        <MissionSection />
        <TeamSection />
        <ClientReviews />
        <span className="sr-only">Innovare HP: Healthcare marketing and growth strategy. Primary content.</span>
      </main>
      <ContactPage />
      <ADABanner />
    </>
  );
};

export default LandingPage;

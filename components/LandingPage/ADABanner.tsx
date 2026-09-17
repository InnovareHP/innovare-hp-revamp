"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ADA_NOTICE_AFTER_EMAIL,
  ADA_NOTICE_BEFORE_EMAIL,
  NOTICE_EMAIL,
  NOTICE_EMAIL_LABEL,
} from "./shared/noticeCopy";

/**
 * Accessibility notice pinned to the bottom of the viewport while the hero is
 * on screen. CSS-only transitions keep it off the landing page's JS budget.
 *
 * Kept under the header's `z-50` so the navigation overlay covers it.
 *
 * Hidden below `md`: on a phone this bar and the events toast cover the hero
 * between them, so `MobileNoticeDock` carries both behind one button instead.
 */
const ADABanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const observerTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;
    observerTarget.current = hero;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleClose = useCallback(() => setIsDismissed(true), []);

  const isVisible = heroInView && !isDismissed;

  return (
    <aside
      className={`fixed inset-x-0 bottom-0 z-30 max-md:hidden border-t border-white/20 bg-brand/95 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-label="Accessibility Notice"
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <div className="hp-container flex items-center justify-between gap-4 py-3">
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
            className="shrink-0 text-white"
          >
            <title id="ada-icon-title">ADA Compliance Information</title>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>

          <p className="text-[11px] leading-snug sm:text-xs md:text-sm">
            {ADA_NOTICE_BEFORE_EMAIL}
            <a
              href={`mailto:${NOTICE_EMAIL}`}
              className="font-medium text-white underline transition-colors hover:text-white/80"
              aria-label={NOTICE_EMAIL_LABEL}
            >
              {NOTICE_EMAIL}
            </a>
            {ADA_NOTICE_AFTER_EMAIL}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="group flex shrink-0 items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-white/10"
          aria-label="Close accessibility notice"
        >
          <span className="hidden text-[10px] font-bold tracking-wider uppercase opacity-60 group-hover:opacity-100 sm:inline">
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
};

export default ADABanner;

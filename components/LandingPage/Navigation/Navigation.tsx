"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavigationProps {
  isFieldNotes?: boolean;
}

const navLinks = [
  { name: "About", href: "#about", title: "About" },
  { name: "Services", href: "#services", title: "Services" },
  { name: "Our Approach", href: "#process", title: "Our Approach" },
  { name: "Client Stories", href: "#reviews", title: "Client Stories" },
  { name: "Mission", href: "#mission", title: "Mission" },
  { name: "Team", href: "#team", title: "Team" },
  { name: "Events", href: "/events", title: "Events" },
  { name: "Field Notes", href: "/field-notes", title: "Field Notes" },
  { name: "Contact", href: "#contact", title: "Contact" },
  { name: "Privacy Policy", href: "/privacy-policy", title: "Privacy Policy" },
];

/** Sections the header reports on, in page order. */
const trackedSections = [
  { id: "about", label: "About us" },
  { id: "services", label: "Our services" },
  { id: "process", label: "Our approach" },
  { id: "reviews", label: "Client stories" },
  { id: "mission", label: "Our mission" },
  { id: "team", label: "Meet the team" },
  { id: "events", label: "Events" },
  { id: "field-notes", label: "Field notes" },
  { id: "contact", label: "Contact us" },
];

const Navigation = ({ isFieldNotes = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const isLanding = pathname === "/";

  // Hash links only resolve on the landing page; prefix them elsewhere.
  const getHref = (href: string) =>
    pathname !== "/" && href.startsWith("#") ? `/${href}` : href;

  /**
   * The header reacts to the scroll itself: it condenses once the hero is
   * behind us, and a hairline across its bottom edge reports how far down the
   * document the reader is. The ratio is written straight to the DOM inside a
   * rAF — putting a scroll position through React state would re-render the
   * header every frame.
   */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
      setIsCondensed(window.scrollY > 120);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /**
   * Which section is being read. The header shows its name and the overlay menu
   * marks the matching link with `aria-current`, so the menu is useful the
   * moment it opens rather than being a flat list.
   */
  useEffect(() => {
    if (!isLanding) return;

    const elements = trackedSections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        // Whichever section occupies most of the reading band wins.
        let best: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        setActiveSection(bestRatio > 0.08 ? best : null);
      },
      {
        // Ignore the strip behind the fixed header, and weight the upper half
        // of the viewport — that is what the reader is actually looking at.
        rootMargin: "-88px 0px -45% 0px",
        threshold: [0, 0.12, 0.3, 0.6, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLanding]);

  const activeLabel = trackedSections.find(
    (section) => section.id === activeSection
  )?.label;

  // Keyboard handling and focus trapping for the overlay menu.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        const menuButton = document.querySelector(
          '[aria-controls="navigation-menu"]'
        ) as HTMLElement;
        menuButton?.focus();
      }

      if (isOpen && e.key === "Tab") {
        const dialog = document.getElementById("navigation-menu");
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        const firstLink = document.querySelector(
          "#navigation-menu a"
        ) as HTMLElement;
        firstLink?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const barLine =
    "block h-[2px] w-full rounded-full bg-white transition-transform duration-300";

  return (
    <>
      <Link
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:rounded-md focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Skip to main content
      </Link>

      <header
        data-condensed={isCondensed}
        className={`group fixed inset-x-0 top-0 z-50 bg-brand transition-shadow duration-300 ${
          isCondensed ? "shadow-[0_6px_24px_-12px_rgba(0,0,0,0.45)]" : ""
        } ${isFieldNotes ? "shadow-sm" : ""}`}
      >
        <div className="hp-container flex h-16 items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[condensed=true]:h-14 lg:h-[81px] lg:group-data-[condensed=true]:h-[62px]">
          <Link
            href="/"
            title="Innovare HP"
            aria-label="Innovare HP home page"
            className="no-underline"
          >
            <Image
              src="/images/redesign/logo-wordmark.webp"
              alt="Innovare HP"
              width={640}
              height={125}
              priority
              className="h-8 w-auto transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[condensed=true]:h-7 lg:h-[45px] lg:group-data-[condensed=true]:h-9"
            />
          </Link>

          {/* Where the reader is. Decorative — the same information is in the
              menu, marked with aria-current. */}
          <span
            aria-hidden
            className={`hidden items-center gap-3 text-[11px] tracking-[0.18em] text-white/70 uppercase transition-opacity duration-500 lg:flex ${
              activeLabel ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="h-px w-8 bg-white/40" />
            {activeLabel ?? ""}
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-6 w-8 flex-col justify-between"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            <span
              className={`${barLine} ${isOpen ? "translate-y-[11px] rotate-45" : ""}`}
            />
            <span
              className={`${barLine} ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`${barLine} ${isOpen ? "-translate-y-[11px] -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Reading progress across the whole document. */}
        <span
          ref={progressRef}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-bright"
        />

        {/* Overlay menu — always mounted so aria-controls stays valid. */}
        <div
          id="navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-deep text-white transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
          }`}
        >
          <nav
            className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto px-6 text-center"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isCurrent =
                isLanding && link.href === `#${activeSection ?? ""}`;

              return (
                <Link
                  key={link.name}
                  href={getHref(link.href)}
                  onClick={() => setIsOpen(false)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`inline-flex items-center justify-center gap-4 text-xl tracking-[0.15em] uppercase underline transition-colors hover:text-white/70 focus:ring-2 focus:ring-white focus:outline-none sm:text-3xl ${
                    isCurrent ? "text-white" : "text-white/75"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-px bg-white transition-all duration-300 ${
                      isCurrent ? "w-8 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation;

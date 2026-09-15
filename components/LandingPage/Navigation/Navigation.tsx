"use client";

import { ArrowRight } from "lucide-react";
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



/** Sections the header tracks, in page order, for the menu's current link. */
const trackedSections = [
  { id: "about" },
  { id: "services" },
  { id: "process" },
  { id: "reviews" },
  { id: "mission" },
  { id: "team" },
  { id: "events" },
  { id: "field-notes" },
  { id: "contact" },
];

const Navigation = ({ isFieldNotes = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
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
      setIsAtTop(window.scrollY <= 4);
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

      {/* Over the landing hero the bar rides on the artwork itself and only
          takes its brand fill once the reader starts scrolling. Other pages
          open on a light surface, so there it stays filled throughout. */}
      <header
        data-condensed={isCondensed}
        className={`group fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          isLanding && isAtTop && !isOpen ? "bg-transparent" : "bg-brand"
        } ${
          isCondensed ? "shadow-[0_6px_24px_-12px_rgba(0,0,0,0.45)]" : ""
        } ${isFieldNotes ? "shadow-sm" : ""}`}
      >
        <div className="hp-container flex h-16 items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[condensed=true]:h-14 lg:h-[81px] lg:group-data-[condensed=true]:h-[62px]">
          <Link
            href="/"
            title="Innovare HP"
            aria-label="Innovare HP home page"
            className="shrink-0 no-underline"
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

        {/* Overlay menu — always mounted so aria-controls stays valid. The
            numbered rows echo the numbered service list and the section badges,
            and the hero halftone sits behind them so the menu belongs to the
            same surface as the page. */}
        <div
          id="navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`fixed inset-0 z-40 overflow-y-auto bg-brand-deep text-white transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
          }`}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src="/images/redesign/hero-texture.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>

          <div className="hp-container relative flex min-h-full flex-col justify-center py-24">
            <span className="flex items-center gap-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">
              <span aria-hidden className="h-px w-8 bg-white/30" />
              Menu
            </span>

            <nav className="mt-8 flex flex-col" aria-label="Main navigation">
              {navLinks.map((link, index) => {
                const isCurrent =
                  isLanding && link.href === `#${activeSection ?? ""}`;

                return (
                  <Link
                    key={link.name}
                    href={getHref(link.href)}
                    onClick={() => setIsOpen(false)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`group/row flex items-baseline gap-5 border-b border-white/10 py-4 no-underline transition-colors duration-300 sm:gap-8 sm:py-5 ${
                      isCurrent ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`text-[11px] tabular-nums transition-colors duration-300 ${
                        isCurrent ? "text-brand-glow" : "text-white/40"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl tracking-[0.02em] sm:text-4xl">
                      {link.name}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="ml-auto size-5 shrink-0 self-center opacity-0 transition-all duration-300 group-hover/row:translate-x-1 group-hover/row:opacity-100"
                    />
                  </Link>
                );
              })}
            </nav>

            <p className="mt-10 max-w-[420px] text-sm leading-[1.6] text-white/60">
              Healthcare marketing and growth strategy — Comstock Park and Ann
              Arbor, Michigan.
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;

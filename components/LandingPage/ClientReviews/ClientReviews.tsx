"use client";

import SectionBadge from "@/components/LandingPage/shared/SectionBadge";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const reviews = [
  {
    highlight:
      "Our organization's relationship with Innovare HP is rooted in a clear increase in revenue-driven by their innovative strategies, collaborative approach, and most importantly, the high-quality introductions they've facilitated.",
    body: "While we are technically a client of Innovare HP, the experience feels far more relational than transactional. They take the time to truly understand our goals, tailor their approach accordingly, and continually invest in our success. If you're looking for a marketing partner who shows up as part of your team and not just a vendor, Innovare HP is the one.",
    name: "Brian Caulfield",
    role: "CMO, Centerline Billing & Consulting",
    headshot: "/images/client-reviews/headshot-2.png",
    logo: "/images/client-reviews/logo-1.png",
  },
  {
    highlight:
      "What comes to mind when I think of Rich, he is amazing at marketing! All kinds of marketing.",
    body: "I have been in business for over 45 years, and he is the most cost-effective creative marketer I have ever worked with. If you need help building your business to higher profits, call Rich! Don't waste your time anywhere else.",
    name: "Ken Watts",
    role: "Owner/Founder, Helping with Mom's Home",
    headshot: "/images/client-reviews/headshot-1.png",
    logo: "/images/client-reviews/logo-2.png",
  },
  {
    highlight:
      "I highly recommend Innovare HP! They made a significant difference in our success!",
    body: "",
    name: "Nadine Carlson",
    role: "Co-owner/Cofounder, Care Provider Solutions",
    headshot: "/images/client-reviews/headshot-3.png",
    logo: "/images/client-reviews/logo-3.png",
  },
];

const COUNT = reviews.length;
/** Three copies: one of runway either side of the live set, so a drag never
 *  reaches an edge before we can silently re-centre it. */
const SETS = 3;
const slides = Array.from({ length: COUNT * SETS }, (_, i) => ({
  ...reviews[i % COUNT],
  key: `${i}`,
  realIndex: i % COUNT,
}));

/** Neighbour avatars sit this fraction of the centre avatar's width apart. */
const AVATAR_GAP_RATIO = 0.975;
/** Neighbour avatar is 87px next to a 157px centre avatar. */
const AVATAR_MIN_SCALE = 87 / 157;

/** Shortest signed distance between two positions on a ring of `COUNT`. */
const ringDelta = (from: number, to: number) => {
  const half = COUNT / 2;
  return ((((to - from + half) % COUNT) + COUNT) % COUNT) - half;
};

const ClientReviews = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(COUNT);
  const [isDragging, setIsDragging] = useState(false);

  // Pointer-drag state kept in a ref so moves don't trigger re-renders.
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = activeSlide % COUNT;

  /**
   * Lay the avatars out from the track's exact scroll offset so they travel
   * with the drag instead of snapping. Distance is measured around a ring, so
   * the first avatar follows the last one round. Written straight to the DOM —
   * running this through React state would re-render on every scroll frame.
   */
  const layoutAvatars = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const raw = track.scrollLeft / track.clientWidth;
    const progress = ((raw % COUNT) + COUNT) % COUNT;

    avatarRefs.current.forEach((el, index) => {
      if (!el) return;
      const distance = ringDelta(progress, index);
      const closeness = Math.max(0, 1 - Math.abs(distance));
      const scale = AVATAR_MIN_SCALE + (1 - AVATAR_MIN_SCALE) * closeness;
      const offset = distance * el.offsetWidth * AVATAR_GAP_RATIO;

      el.style.transform = `translate(-50%, -50%) translateX(${offset}px) scale(${scale})`;
      // Stays low and scoped by `isolate` on the stage, so the fixed header
      // (z-50) still paints above the avatars when the section scrolls under it.
      el.style.zIndex = String(Math.round(10 - Math.abs(distance) * 3));
    });
  }, []);

  /**
   * Once scrolling stops, jump by whole sets so we sit in the middle copy
   * again. The sets are identical, so the jump is invisible — it just keeps
   * runway available in both directions.
   */
  const recentre = useCallback(() => {
    const el = trackRef.current;
    if (!el || drag.current.down || el.clientWidth === 0) return;

    const index = Math.round(el.scrollLeft / el.clientWidth);
    const target = COUNT + (((index % COUNT) + COUNT) % COUNT);
    if (target !== index) {
      el.scrollLeft = target * el.clientWidth;
      setActiveSlide(target);
    }
  }, []);

  /** Start in the middle set. */
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = COUNT * el.clientWidth;
    layoutAvatars();

    const onResize = () => {
      el.scrollLeft =
        Math.round(el.scrollLeft / el.clientWidth) * el.clientWidth;
      layoutAvatars();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layoutAvatars]);

  // Derive the active slide from scroll position (drag, swipe, or dot click).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        layoutAvatars();
        const index = Math.round(el.scrollLeft / el.clientWidth);
        setActiveSlide((prev) => (prev === index ? prev : index));
      });

      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(recentre, 160);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [layoutAvatars, recentre]);

  /** Scroll the track only — never the page. Always takes the short way round. */
  const goTo = useCallback((realIndex: number) => {
    const el = trackRef.current;
    if (!el) return;
    const current = Math.round(el.scrollLeft / el.clientWidth);
    const delta = ringDelta(((current % COUNT) + COUNT) % COUNT, realIndex);
    el.scrollTo({
      left: (current + delta) * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch and pen already pan natively; only mouse needs drag-to-scroll.
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const el = trackRef.current;
    drag.current.down = false;
    setIsDragging(false);
    if (!el) return;
    if (el.hasPointerCapture(e.pointerId))
      el.releasePointerCapture(e.pointerId);
    // Snap is disabled mid-drag, so settle on the nearest slide ourselves.
    el.scrollTo({
      left: Math.round(el.scrollLeft / el.clientWidth) * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      id="reviews"
      aria-label="Client stories"
      className="bg-surface-3 py-16 sm:py-20 lg:py-[44px] lg:pt-[44px] lg:pb-[115px]"
    >
      <div className="hp-container">
        <SectionBadge number="04" className="w-fit">
          Client stories
        </SectionBadge>

        <div
          data-anim="stagger"
          className="mt-8 grid gap-6 lg:mt-[74px] lg:grid-cols-2 lg:gap-16"
        >
          <h2
            data-anim="lines"
            className="max-w-[400px] text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink"
          >
            Real partnerships. Meaningful results.
          </h2>
          <p className="max-w-[356px] self-center text-base leading-[25px] text-ink sm:text-lg lg:justify-self-end">
            Here are some reviews from mission-based organizations that we have
            helped.
          </p>
        </div>

        <div
          data-anim="rise"
          className="mt-10 rounded-[20px] bg-surface-1 px-6 py-10 sm:px-10 lg:mt-[65px] lg:px-16 lg:py-[44px]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client stories"
        >
          {/* Avatars are positioned from the track's scroll offset, so they
              glide along with a drag or swipe and wrap around endlessly. */}
          <div className="relative isolate h-[104px] sm:h-[157px]">
            {reviews.map((review, index) => (
              <div
                key={review.name}
                ref={(el) => {
                  avatarRefs.current[index] = el;
                }}
                className="absolute top-1/2 left-1/2 size-[104px] will-change-transform sm:size-[157px]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <Image
                  src={review.headshot}
                  alt={index === active ? review.name : ""}
                  aria-hidden={index !== active}
                  width={157}
                  height={157}
                  sizes="157px"
                  draggable={false}
                  className="size-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Drag/swipe track. All slides stay mounted and stretch to the
              tallest one, so changing slides never reflows the page. */}
          <div
            ref={trackRef}
            tabIndex={0}
            data-dragging={isDragging}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/40 data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none data-[dragging=true]:select-none lg:mt-[62px] lg:cursor-grab"
          >
            {slides.map((slide, index) => (
              <figure
                key={slide.key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slide.realIndex + 1} of ${COUNT}`}
                aria-hidden={index !== activeSlide}
                className="flex w-full shrink-0 snap-center snap-always flex-col justify-center px-1 text-center"
              >
                <blockquote>
                  <p className="mx-auto max-w-[863px] text-[clamp(1.125rem,2.2vw,1.5625rem)] leading-[1.35] font-medium text-ink">
                    &ldquo;{slide.highlight}&rdquo;
                  </p>
                  {slide.body ? (
                    <p className="mx-auto mt-5 max-w-[773px] text-base leading-[25px] text-ink sm:text-lg">
                      {slide.body}
                    </p>
                  ) : null}
                </blockquote>

                <figcaption className="mt-8 flex items-center justify-center gap-4 lg:mt-[62px]">
                  <Image
                    src={slide.logo}
                    alt={`${slide.role} logo`}
                    width={94}
                    height={78}
                    sizes="94px"
                    draggable={false}
                    className="h-[62px] w-auto object-contain sm:h-[78px]"
                  />
                  <div className="text-left">
                    <p className="text-lg font-medium text-brand sm:text-xl">
                      {slide.name}
                    </p>
                    <p className="text-sm text-ink sm:text-[15px]">
                      {slide.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 lg:mt-[45px]">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show review from ${review.name}`}
              aria-current={index === active}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                index === active
                  ? "w-[54px] bg-brand"
                  : "w-[30px] bg-brand/25 hover:bg-brand/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;

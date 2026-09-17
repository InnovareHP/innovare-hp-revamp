"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "power3.out";

/**
 * Single animation island for the landing page. Sections stay server-rendered
 * and simply mark themselves up with `data-anim` attributes; this component
 * wires the ScrollTriggers once.
 *
 * Every reveal is transform-only — nothing is ever faded to `opacity: 0` while
 * it sits in the accessibility tree, and the page is fully legible if this
 * script never runs. The one exception is `data-anim="mask"`, a clip-path wipe
 * on decorative imagery, whose covered start state lives behind a
 * `prefers-reduced-motion: no-preference` query in `globals.css`.
 *
 * Everything runs inside one `matchMedia` block keyed on three conditions:
 * motion preference, viewport width, and whether a real pointer exists. Phones
 * get the same choreography at shorter travel and skip the scrubbed, always-on
 * work (parallax, collage drift, ambient hero loops) that costs the most to
 * paint on a small GPU.
 */
const LandingAnimations = () => {
  /**
   * The landing page always opens at the hero. Browsers restore the previous
   * scroll offset on a refresh, which drops the reader a few dozen pixels into
   * the hero — the header has already taken its brand fill and the copy sits
   * under the bar. A deep link (`/#services`) still wins, and the browser's own
   * restoration is put back when the page unmounts.
   */
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { motion, desktop, fine } = (context.conditions ?? {}) as Record<
          string,
          boolean
        >;
        if (!motion) return;

        const splits: SplitText[] = [];

        /** Phones travel less and settle quicker than a wide desktop stage. */
        const travel = (value: number) => (desktop ? value : value * 0.6);
        const time = (value: number) => (desktop ? value : value * 0.85);

        /** Shared ScrollTrigger config for one-shot reveals. */
        const once = (trigger: Element, start = "top 88%") => ({
          trigger,
          start,
          once: true,
        });

        // ---- Hero ----

        // Words rise out of their own mask, so the first thing on the page has
        // a beat to it rather than arriving as one block.
        gsap.utils.toArray<HTMLElement>("[data-anim='words']").forEach((el) => {
          SplitText.create(el, {
            type: "words",
            mask: "words",
            autoSplit: true,
            onSplit(self) {
              splits.push(self);
              return gsap.fromTo(
                self.words,
                { yPercent: 120, rotate: 4 },
                {
                  yPercent: 0,
                  rotate: 0,
                  duration: time(0.9),
                  ease: "power4.out",
                  stagger: 0.05,
                  delay: 0.15,
                }
              );
            },
          });
        });

        // Ambient hero loops are wide-screen only: they never stop, so they are
        // the last thing a phone should be asked to composite.
        if (desktop) {
          const banner =
            document.querySelector<HTMLElement>("[data-hero-drift]");
          if (banner) {
            gsap.to(banner, {
              xPercent: 2.5,
              duration: 14,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }

          // Leaving the hero: the copy lifts away a little faster than the page
          // scrolls, which hands the next section the eye.
          const copy = document.querySelector<HTMLElement>("[data-hero-copy]");
          if (copy) {
            gsap.to(copy, {
              yPercent: -14,
              scale: 0.97,
              ease: "none",
              scrollTrigger: {
                trigger: copy.closest("section") ?? copy,
                start: "top top",
                end: "bottom top",
                scrub: 0.4,
              },
            });
          }
        }

        // One stagger on load for the rest of the hero copy.
        const heroItems = gsap.utils.toArray<HTMLElement>(
          // The headline runs its own word reveal above; everything else in the
          // hero rises together.
          "[data-anim='hero'] > *:not([data-anim='words'])"
        );
        if (heroItems.length) {
          gsap.fromTo(
            heroItems,
            { y: travel(26) },
            {
              y: 0,
              duration: time(0.75),
              ease: EASE,
              stagger: 0.09,
              clearProps: "transform",
            }
          );
        }

        // ---- Section reveals ----

        // Headlines reveal line by line behind a mask (overflow, never opacity).
        gsap.utils.toArray<HTMLElement>("[data-anim='lines']").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              splits.push(self);
              return gsap.fromTo(
                self.lines,
                { yPercent: 110 },
                {
                  yPercent: 0,
                  duration: time(0.85),
                  ease: EASE,
                  stagger: 0.12,
                  scrollTrigger: once(el, "top 85%"),
                }
              );
            },
          });
        });

        /** Simple one-shot transforms, keyed by `data-anim` value. */
        const variants: Record<string, gsap.TweenVars> = {
          rise: { y: travel(32) },
          "slide-left": { x: travel(-40) },
          "slide-right": { x: travel(40) },
          zoom: { scale: 0.94 },
          // Lifts in with a touch of rotation, so grids of cards don't all
          // travel on the same axis as the section above them.
          lift: { y: travel(44), rotate: desktop ? -1.4 : 0, scale: 0.97 },
        };

        Object.entries(variants).forEach(([name, from]) => {
          gsap.utils
            .toArray<HTMLElement>(`[data-anim='${name}']`)
            .forEach((el) => {
              gsap.fromTo(el, from, {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                duration: time(0.8),
                ease: EASE,
                clearProps: "transform",
                scrollTrigger: once(el),
              });
            });
        });

        // Containers whose direct children rise in sequence. `data-anim-from`
        // picks the direction so neighbouring sections don't all move alike.
        gsap.utils
          .toArray<HTMLElement>("[data-anim='stagger']")
          .forEach((group) => {
            const children = Array.from(group.children) as HTMLElement[];
            if (!children.length) return;
            const from = variants[group.dataset.animFrom ?? "rise"] ?? {
              y: travel(28),
            };
            gsap.fromTo(children, from, {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: time(0.65),
              ease: EASE,
              stagger: 0.08,
              clearProps: "transform",
              scrollTrigger: once(group, "top 85%"),
            });
          });

        // Imagery uncovers itself with a bottom-up wipe while the picture inside
        // settles back to its resting scale — the frame opens, the photo relaxes.
        gsap.utils.toArray<HTMLElement>("[data-anim='mask']").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: once(el, "top 85%") });
          tl.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            // No `clearProps` here: the covered start state is a CSS rule, so
            // dropping the inline value would re-hide the picture.
            {
              clipPath: "inset(0 0 0% 0)",
              duration: time(1),
              ease: "power4.out",
            }
          ).fromTo(
            el.querySelector("img") ?? el,
            { scale: desktop ? 1.16 : 1.08 },
            {
              scale: 1,
              duration: time(1.2),
              ease: EASE,
              clearProps: "transform",
            },
            0
          );
        });

        // ---- Scrubbed depth (wide screens only) ----

        if (desktop) {
          // Slow drift on full-bleed imagery.
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            gsap.fromTo(
              el,
              { yPercent: -5, scale: 1.12 },
              {
                yPercent: 5,
                scale: 1.12,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          // Stacked collage pieces travel at their own pace, so the group opens
          // up slightly as the section crosses the viewport. `data-float` is the
          // relative speed — a bigger number drifts further.
          gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
            const distance = Number(el.dataset.float) || 0;
            gsap.fromTo(
              el,
              { y: distance },
              {
                y: -distance,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          });

          // Sticky rails: the column parks (CSS `position: sticky`) while its
          // neighbour scrolls on. To keep the parked side from reading as a
          // frozen screenshot, its media breathes and its hairline reports how
          // far through the neighbour the reader is.
          gsap.utils
            .toArray<HTMLElement>("[data-sticky-col]")
            .forEach((rail) => {
              const section = rail.closest("section") ?? rail.parentElement;
              if (!section) return;

              const scrub = {
                trigger: section,
                start: "top 60%",
                end: "bottom bottom",
                scrub: 0.5,
              };

              const media = rail.querySelector<HTMLElement>(
                "[data-sticky-media]"
              );
              if (media) {
                gsap.fromTo(
                  media,
                  { yPercent: -3, scale: 1.04 },
                  {
                    yPercent: 3,
                    scale: 0.98,
                    ease: "none",
                    scrollTrigger: scrub,
                  }
                );
              }

              const progress = rail.querySelector<HTMLElement>(
                "[data-sticky-progress]"
              );
              if (progress) {
                gsap.fromTo(
                  progress,
                  { scaleY: 0 },
                  {
                    scaleY: 1,
                    ease: "none",
                    transformOrigin: "top center",
                    scrollTrigger: {
                      ...scrub,
                      start: "top 70%",
                      end: "bottom 80%",
                    },
                  }
                );
              }
            });
        }

        // ---- Timeline rail ----

        // The rail draws itself as the section scrolls, lighting each dot as
        // the line reaches it.
        gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((list) => {
          const progress = list.querySelector<HTMLElement>(
            "[data-timeline-progress]"
          );
          const dots = gsap.utils.toArray<HTMLElement>(
            "[data-timeline-dot]",
            list
          );
          if (!progress) return;

          // Each step's copy waits below its mask and slides up only when the
          // rail reaches it, so the four points land one at a time. Transform
          // only: the text stays in the document and in the a11y tree, and if
          // this script never runs nothing is hidden in the first place.
          const details = dots.map((dot) =>
            dot.querySelector<HTMLElement>("[data-timeline-detail]")
          );
          gsap.set(details.filter(Boolean), { yPercent: 110 });
          gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

          gsap.to(progress, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              // Wide window and a lazy scrub: the rail trails the scroll and
              // each step gets its own moment rather than all four lighting at
              // once on a fast flick.
              start: "top 85%",
              end: "bottom 45%",
              scrub: 1.1,
              onUpdate: ({ progress: p }) => {
                const reached = p * list.offsetHeight;
                dots.forEach((dot, index) => {
                  const active = dot.offsetTop <= reached;
                  if ((dot.dataset.active === "true") === active) return;

                  dot.dataset.active = String(active);
                  const detail = details[index];
                  if (!detail) return;
                  gsap.to(detail, {
                    yPercent: active ? 0 : 110,
                    duration: time(0.9),
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                });
              },
            },
          });
        });

        // ---- Stat figures ----

        // The final value is already in the HTML, so a reader without JS sees
        // the real number. A group marked `data-count-scrub` ties its figures to
        // the scroll itself and finishes them one after another; anywhere else
        // they simply run once, staggered.
        gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
          const target = Number(el.dataset.countTo);
          if (!Number.isFinite(target)) return;

          const suffix = el.dataset.countSuffix ?? "";
          const counter = { value: 0 };
          const write = () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          };

          const group = el.closest<HTMLElement>("[data-count-scrub]");
          const index = group
            ? gsap.utils
                .toArray<HTMLElement>("[data-count-to]", group)
                .indexOf(el)
            : 0;

          if (group) {
            gsap.to(counter, {
              value: target,
              ease: "none",
              scrollTrigger: {
                trigger: group,
                start: "top 95%",
                // Each figure finishes a little later than the one before it.
                end: `top ${40 - index * 8}%`,
                scrub: 0.5,
              },
              onUpdate: write,
            });
            return;
          }

          gsap.to(counter, {
            value: target,
            duration: time(1.4),
            delay: index * 0.12,
            ease: "power2.out",
            scrollTrigger: once(el, "top 90%"),
            onUpdate: write,
            onComplete: () => {
              el.textContent = `${target}${suffix}`;
            },
          });
        });

        // ---- Pointer affordances ----

        // Hover motion only where a real pointer exists: on touch there is no
        // hover state to leave, so a row would stay shifted after a tap.
        if (!fine) {
          return () => splits.forEach((split) => split.revert());
        }

        // Rows lean toward the pointer and settle back with a little overshoot.
        // The CSS class on the element covers keyboard focus and the no-JS case.
        const rowCleanups = gsap.utils
          .toArray<HTMLElement>("[data-hover-row]")
          .map((row) => {
            const shift = Number(row.dataset.hoverRow) || 12;
            const moveTo = gsap.quickTo(row, "x", {
              duration: 0.55,
              ease: "power3.out",
            });

            const enter = () => moveTo(shift);
            const leave = () => moveTo(0);

            row.addEventListener("pointerenter", enter);
            row.addEventListener("pointerleave", leave);
            return () => {
              row.removeEventListener("pointerenter", enter);
              row.removeEventListener("pointerleave", leave);
              gsap.set(row, { clearProps: "transform" });
            };
          });

        // Call-to-action pills drift a few pixels toward the cursor, then snap
        // home — the button feels like it wants to be pressed.
        const magnetCleanups = gsap.utils
          .toArray<HTMLElement>("[data-magnetic]")
          .map((el) => {
            const xTo = gsap.quickTo(el, "x", {
              duration: 0.4,
              ease: "power3",
            });
            const yTo = gsap.quickTo(el, "y", {
              duration: 0.4,
              ease: "power3",
            });

            const move = (event: PointerEvent) => {
              const box = el.getBoundingClientRect();
              xTo((event.clientX - (box.left + box.width / 2)) * 0.22);
              yTo((event.clientY - (box.top + box.height / 2)) * 0.34);
            };
            const reset = () => {
              xTo(0);
              yTo(0);
            };

            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", reset);
            el.addEventListener("blur", reset);
            return () => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", reset);
              el.removeEventListener("blur", reset);
              gsap.set(el, { clearProps: "transform" });
            };
          });

        return () => {
          splits.forEach((split) => split.revert());
          rowCleanups.forEach((fn) => fn());
          magnetCleanups.forEach((fn) => fn());
        };
      }
    );

    // Late-loading imagery changes section heights; re-measure once settled.
    // The refresh is deferred a frame and dropped once this effect is torn
    // down: a refresh that lands while `mm.revert()` is killing triggers walks
    // a list that is shrinking under it, which throws inside ScrollTrigger
    // (`curTrigger.end` on an index that no longer exists). React's dev-mode
    // double mount makes that race easy to hit.
    let isActive = true;
    let refreshFrame = 0;

    const refresh = () => {
      refreshFrame = requestAnimationFrame(() => {
        if (isActive) ScrollTrigger.refresh();
      });
    };
    window.addEventListener("load", refresh);

    return () => {
      isActive = false;
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
};

export default LandingAnimations;

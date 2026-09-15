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
 * script never runs.
 */
const LandingAnimations = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];

      /** Shared ScrollTrigger config for one-shot reveals. */
      const once = (trigger: Element, start = "top 88%") => ({
        trigger,
        start,
        once: true,
      });

      // Hero: one stagger on load.
      const heroItems = gsap.utils.toArray<HTMLElement>(
        "[data-anim='hero'] > *"
      );
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { y: 26 },
          {
            y: 0,
            duration: 0.75,
            ease: EASE,
            stagger: 0.09,
            clearProps: "transform",
          }
        );
      }

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
                duration: 0.85,
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
        rise: { y: 32 },
        "slide-left": { x: -40 },
        "slide-right": { x: 40 },
        zoom: { scale: 0.94 },
      };

      Object.entries(variants).forEach(([name, from]) => {
        gsap.utils
          .toArray<HTMLElement>(`[data-anim='${name}']`)
          .forEach((el) => {
            gsap.fromTo(el, from, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
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
            y: 28,
          };
          gsap.fromTo(children, from, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: EASE,
            stagger: 0.08,
            clearProps: "transform",
            scrollTrigger: once(group, "top 85%"),
          });
        });

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

      // Timeline rail draws itself as the section scrolls, lighting each dot
      // as the line reaches it.
      gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((list) => {
        const progress = list.querySelector<HTMLElement>(
          "[data-timeline-progress]"
        );
        const dots = gsap.utils.toArray<HTMLElement>(
          "[data-timeline-dot]",
          list
        );
        if (!progress) return;

        // Each step's copy waits just below its resting place and slides up as
        // the rail reaches it — transform only, so the text is always legible.
        const details = dots.map((dot) =>
          dot.querySelector<HTMLElement>("[data-timeline-detail]")
        );
        gsap.set(details.filter(Boolean), { y: 18 });
        gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

        gsap.to(progress, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.4,
            onUpdate: ({ progress: p }) => {
              const reached = p * list.offsetHeight;
              dots.forEach((dot, index) => {
                const active = dot.offsetTop <= reached;
                if ((dot.dataset.active === "true") === active) return;

                dot.dataset.active = String(active);
                const detail = details[index];
                if (!detail) return;
                gsap.to(detail, {
                  y: active ? 0 : 18,
                  duration: 0.55,
                  ease: EASE,
                  overwrite: "auto",
                });
              });
            },
          },
        });
      });

      // Stat figures count up. The final value is already in the HTML, so a
      // reader without JS sees the real number.
      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
        const target = Number(el.dataset.countTo);
        if (!Number.isFinite(target)) return;
        const suffix = el.dataset.countSuffix ?? "";
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: once(el, "top 90%"),
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = `${target}${suffix}`;
          },
        });
      });

      return () => splits.forEach((split) => split.revert());
    });

    // Late-loading imagery changes section heights; re-measure once settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
};

export default LandingAnimations;

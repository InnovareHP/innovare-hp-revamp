"use client";

import { useEffect } from "react";

/**
 * Hides visually hidden UI from assistive technology when empty (ADA: "visually hidden
 * content should not be exposed to AT"). Sonner: hidden when no toasts. Next.js route
 * announcer: hidden when no announcement text. When they have content, they stay exposed.
 */
export function ToasterA11y() {
  useEffect(() => {
    const updateAriaHidden = () => {
      // Sonner notifications section: hide from AT when no toasts
      const sonnerSection = document.querySelector<HTMLElement>(
        'section[aria-label*="Notifications"]'
      );
      if (sonnerSection) {
        const hasToasts = sonnerSection.querySelector("[data-sonner-toaster] li");
        sonnerSection.setAttribute("aria-hidden", hasToasts ? "false" : "true");
      }

      // Next.js route announcer: hide from AT when no announcement text
      const routeAnnouncer = document.getElementById("__next-route-announcer__");
      if (routeAnnouncer) {
        const hasContent = (routeAnnouncer.textContent ?? "").trim().length > 0;
        routeAnnouncer.setAttribute("aria-hidden", hasContent ? "false" : "true");
      }
    };

    updateAriaHidden();

    const observer = new MutationObserver(updateAriaHidden);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const interval = setInterval(updateAriaHidden, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}

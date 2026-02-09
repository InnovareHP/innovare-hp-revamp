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

      // Next.js route announcer (div and custom element): hide from AT when no announcement text
      const routeAnnouncerDiv = document.getElementById("__next-route-announcer__");
      const hasAnnouncerContent =
        (routeAnnouncerDiv?.textContent ?? "").trim().length > 0;
      if (routeAnnouncerDiv) {
        routeAnnouncerDiv.setAttribute("aria-hidden", hasAnnouncerContent ? "false" : "true");
      }
      const routeAnnouncerElement = document.querySelector<HTMLElement>("next-route-announcer");
      if (routeAnnouncerElement) {
        routeAnnouncerElement.setAttribute("aria-hidden", hasAnnouncerContent ? "false" : "true");
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

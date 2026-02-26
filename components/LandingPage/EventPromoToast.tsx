"use client";

import { cn } from "@/lib/utils";
import { CalendarIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const DISPLAY_MS = 4000;
const FADE_MS = 400;

export function EventPromoToast() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget || e.propertyName !== "opacity" || !fading)
        return;
      setVisible(false);
    },
    [fading]
  );

  const handleClose = useCallback(() => setFading(true), []);

  if (!visible) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Events notice"
      className={cn(
        "fixed bottom-20 right-6 z-[200] w-[min(360px,calc(100vw-2rem))] rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg transition-opacity ease-out",
        fading ? "opacity-0" : "opacity-100"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="flex gap-3">
        <CalendarIcon className="size-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1 pr-6">
          <p className="font-medium">Check our latest events</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            See upcoming workshops and webinars.{" "}
            <Link
              href="/events"
              className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
            >
              View events
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close events notice"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </aside>
  );
}

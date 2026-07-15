"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const DISPLAY_MS = 4000;
const FADE_MS = 400;

export function EventPromoToast() {
  const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");
  const hasStartedRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFadeTimer = () => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const startFade = () => {
    if (phase !== "visible") return;
    clearFadeTimer();
    setPhase("fading");
  };

  if (phase === "hidden") return null;

  return (
    <aside
      ref={(el) => {
        if (el && !hasStartedRef.current) {
          hasStartedRef.current = true;
          fadeTimerRef.current = setTimeout(startFade, DISPLAY_MS);
          return;
        }
        if (!el) clearFadeTimer();
      }}
      role="status"
      aria-live="polite"
      aria-label="Events notice"
      className={`fixed bottom-20 right-6 z-200 w-[min(360px,calc(100vw-2rem))] rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg transition-opacity ease-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      onTransitionEnd={(e) => {
        if (e.target !== e.currentTarget || e.propertyName !== "opacity" || phase !== "fading")
          return;
        setPhase("hidden");
      }}
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
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={startFade}
          className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
          aria-label="Close events notice"
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    </aside>
  );
}

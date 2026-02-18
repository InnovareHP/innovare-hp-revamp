"use client";

import { CalendarIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * Event promo shown as a fixed bottom-right card (toast-like).
 * Does not use Sonner so the global Toaster position stays unchanged for other toasts.
 */
export function EventPromoToast() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside
      className="fixed bottom-20 right-6 z-[200] w-[min(360px,calc(100vw-2rem))] rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg"
      aria-label="Events notice"
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
          onClick={() => setVisible(false)}
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close events notice"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </aside>
  );
}

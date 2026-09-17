"use client";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, CalendarIcon, InfoIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ADA_NOTICE_AFTER_EMAIL,
  ADA_NOTICE_BEFORE_EMAIL,
  EVENTS_NOTICE,
  NOTICE_EMAIL,
  NOTICE_EMAIL_LABEL,
} from "./shared/noticeCopy";

/** Drag distance, in px, past which releasing the sheet dismisses it. */
const DISMISS_AFTER = 96;

/** How long after the last scroll event the button fades back in. */
const SETTLE_MS = 200;

/**
 * Phone-sized replacement for the ADA banner and the events toast, which both
 * cover the hero on a narrow screen. Everything they say lives behind one
 * button in the bottom-right corner; the notices themselves are hidden below
 * `md` (see `ADABanner` / `EventPromoToast`), so only one of the two
 * presentations is ever on screen.
 *
 * The panel is a bottom sheet built on Radix Dialog, which brings the focus
 * trap, `Esc`, outside-click and background scroll lock that a hand-rolled
 * popover had to approximate. It can also be swiped down to dismiss: the drag
 * moves the sheet under the finger and either settles back or closes on
 * release.
 */
const MobileNoticeDock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragOffset = useRef(0);

  // While the page is moving the button steps back so it stops covering the
  // section being scrolled past, then settles in once the scroll stops.
  // `scroll` fires dozens of times a second, so the state only flips on the
  // edges of a scroll burst — otherwise every frame would re-render the dock.
  useEffect(() => {
    let settleTimer: ReturnType<typeof setTimeout>;
    let isMoving = false;

    const onScroll = () => {
      if (!isMoving) {
        isMoving = true;
        setIsScrolling(true);
      }
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        isMoving = false;
        setIsScrolling(false);
      }, SETTLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Moves the sheet with the finger; transition is off for the duration. */
  const setSheetOffset = (offset: number, animate = false) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.transition = animate ? "transform 200ms ease-out" : "none";
    sheet.style.transform = offset > 0 ? `translateY(${offset}px)` : "";
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Mouse drags would fight text selection; this gesture is for touch.
    if (event.pointerType === "mouse") return;
    dragStartY.current = event.clientY;
    dragOffset.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    // Only downward travel counts — dragging up must not lift the sheet off
    // the bottom edge and expose the page behind it.
    dragOffset.current = Math.max(0, event.clientY - dragStartY.current);
    setSheetOffset(dragOffset.current);
  };

  const onPointerUp = () => {
    if (dragStartY.current === null) return;
    const shouldDismiss = dragOffset.current > DISMISS_AFTER;
    dragStartY.current = null;

    if (shouldDismiss) {
      // The drag transform stays put: the exit animation overrides it in the
      // cascade and runs from wherever the finger left the sheet, so it slides
      // away rather than snapping back to the bottom edge first.
      setIsOpen(false);
      return;
    }
    setSheetOffset(0, true);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Clear any leftover drag transform as the sheet comes back up.
        if (open) setSheetOffset(0);
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Open site notices: events and accessibility"
          className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-12 items-center justify-center rounded-full border border-hairline bg-white text-brand shadow-[0_6px_20px_rgba(0,58,158,0.18)] transition-[opacity,transform,box-shadow] duration-200 ease-out outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 md:hidden ${
            isScrolling
              ? "scale-90 opacity-35 shadow-none"
              : "scale-100 opacity-100"
          }`}
        >
          {/* Same white card and brand ink as the sheet it opens. */}
          <InfoIcon aria-hidden className="size-5" strokeWidth={1.75} />
          {/* Brand-bright pip: reads as a notice marker, echoes the accent
              used on the sheet's rows. */}
          <span
            aria-hidden
            className="absolute top-1 right-1 size-2 rounded-full bg-brand-bright ring-2 ring-white"
          />
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="z-[60] bg-ink/50 backdrop-blur-[2px] md:hidden" />

        <DialogPrimitive.Content
          ref={sheetRef}
          onOpenAutoFocus={(event) => {
            // Focusing the first link scrolls the row under the sheet header on
            // some phones; the sheet itself takes focus instead.
            event.preventDefault();
            sheetRef.current?.focus();
          }}
          className="fixed inset-x-0 bottom-0 z-[60] rounded-t-2xl border-t border-hairline bg-white text-ink shadow-[0_-10px_34px_rgba(0,58,158,0.22)] outline-none duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom md:hidden"
        >
          {/* Grab area: the handle and the header are the drag target, so a
              flick anywhere in the copy still scrolls or taps as expected. */}
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="touch-none px-4 pt-3 pb-2"
          >
            <span
              aria-hidden
              className="mx-auto block h-1 w-10 rounded-full bg-hairline"
            />

            <div className="mt-3 flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3 text-[11px] tracking-[0.18em] text-ink-muted uppercase">
                <span aria-hidden className="h-px w-6 bg-brand/35" />
                Site notices
              </DialogTitle>

              <DialogClose
                aria-label="Close site notices"
                className="flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand active:bg-surface-3"
              >
                <XIcon aria-hidden className="size-5" />
              </DialogClose>
            </div>
          </div>

          <DialogDescription className="sr-only">
            Upcoming events and our accessibility commitment.
          </DialogDescription>

          <div className="px-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {/* Whole row is the tap target (>=56px) instead of an inline link. */}
            <Link
              href="/events"
              onClick={() => setIsOpen(false)}
              className="flex min-h-14 items-center gap-3 rounded-xl p-3 no-underline transition-colors active:bg-surface-3"
            >
              <CalendarIcon
                aria-hidden
                className="size-5 shrink-0 text-brand"
              />
              <span className="flex-1 text-sm leading-snug text-ink">
                {EVENTS_NOTICE}
                <span className="mt-0.5 block font-bold tracking-[0.02em] text-brand">
                  View events
                </span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-brand-bright"
              />
            </Link>

            <div className="mx-3 h-px bg-hairline" />

            <a
              href={`mailto:${NOTICE_EMAIL}`}
              aria-label={NOTICE_EMAIL_LABEL}
              className="flex min-h-14 items-start gap-3 rounded-xl p-3 no-underline transition-colors active:bg-surface-3"
            >
              <InfoIcon
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-brand"
              />
              <span className="flex-1 text-sm leading-snug text-ink">
                {ADA_NOTICE_BEFORE_EMAIL}
                <span className="font-bold text-brand underline underline-offset-2">
                  {NOTICE_EMAIL}
                </span>
                {ADA_NOTICE_AFTER_EMAIL}
              </span>
            </a>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default MobileNoticeDock;

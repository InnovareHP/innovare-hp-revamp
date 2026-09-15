"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isRegisteredForEvent } from "@/lib/event-registration-storage";
import { formatDate, formatTime } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Monitor,
  QrCode,
  Video,
} from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import EventMap from "./EventMap";
import EventRegistrationModal from "./EventRegistrationModal";

type EventWithRelations = Prisma.EventGetPayload<{
  include: { media: true; attendees: true; guests: true; expectations: true };
}>;

interface EventDetailClientProps {
  event: EventWithRelations;
}

/** Label + value pair used down the detail rail. */
const MetaRow = ({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  hint?: string;
}) => (
  <div className="flex items-start gap-4 border-t border-hairline py-5 first:border-t-0 first:pt-0">
    <Icon aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
    <div className="min-w-0">
      <p className="text-[13px] tracking-[0.18em] text-brand uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-ink sm:text-xl">{value}</p>
      {hint ? <p className="mt-0.5 text-sm text-ink-muted">{hint}</p> : null}
    </div>
  </div>
);

const EventDetailClient = ({ event }: EventDetailClientProps) => {
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setUserIsRegistered(isRegisteredForEvent(event.id));
    setOrigin(window.location.origin);
  }, [event.id]);

  const isPastDeadline = event.registrationDeadline
    ? new Date() > new Date(event.registrationDeadline)
    : false;
  const eventCutoffDate = event.eventEndDate
    ? new Date(event.eventEndDate)
    : new Date(event.eventStartDate);
  const isPastEvent = new Date() > eventCutoffDate;

  const encodedLocation = encodeURIComponent(event.location);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  const eventPrice = event.price ? Number(event.price) : null;
  const isVirtual = event.eventType === "VIRTUAL";
  const isOpen = event.status === "PUBLISHED" && !isPastEvent;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="hp-container grid gap-12 py-12 lg:grid-cols-[1fr_420px] lg:gap-16 lg:py-[72px]">
      {/* ---- Main column ---- */}
      <div>
        {event.media?.url ? (
          <div className="overflow-hidden rounded-[20px] bg-surface-3">
            {/* Event posters come in every ratio, so show the whole artwork
                rather than cropping it to a fixed box. */}
            <Image
              src={event.media.url}
              alt={event.title}
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex h-7 items-center rounded-full px-3 text-[13px] font-medium ${
              event.isPaid && eventPrice && eventPrice > 0
                ? "bg-brand text-white"
                : "border border-hairline bg-white text-brand"
            }`}
          >
            {event.isPaid && eventPrice && eventPrice > 0
              ? formatPrice(eventPrice)
              : "Free"}
          </span>
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-hairline bg-white px-3 text-[13px] font-medium text-ink">
            {isVirtual ? (
              <Monitor aria-hidden className="size-3.5" />
            ) : (
              <MapPin aria-hidden className="size-3.5" />
            )}
            {isVirtual ? "Virtual" : "Onsite"}
          </span>
          {isPastEvent ? (
            <span className="inline-flex h-7 items-center rounded-full border border-hairline bg-white px-3 text-[13px] font-medium text-ink-muted">
              Event ended
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] font-semibold text-ink">
          {event.title}
        </h1>

        {event.hostedBy ? (
          <p className="mt-3 text-base text-ink-muted sm:text-lg">
            Hosted by <span className="text-ink">{event.hostedBy}</span>
          </p>
        ) : null}

        <p className="mt-6 max-w-[650px] text-base leading-[25px] whitespace-pre-line text-ink sm:text-lg">
          {event.description}
        </p>

        {event.expectations && event.expectations.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-semibold text-ink">
              What to expect
            </h2>
            <ul className="mt-5 space-y-3">
              {event.expectations.map((expectation) => (
                <li key={expectation.id} className="flex items-start gap-3">
                  <Check
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-brand"
                    strokeWidth={3}
                  />
                  <span className="text-base leading-[25px] text-ink sm:text-lg">
                    {expectation.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Location / meeting */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-semibold text-ink">
              {isVirtual ? "Meeting details" : "Event location"}
            </h2>
            {!isVirtual ? (
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-bold tracking-[0.02em] text-brand uppercase no-underline hover:text-brand-deep"
              >
                Directions
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={2.4}
                />
                <span className="sr-only">
                  (opens Google Maps in a new tab)
                </span>
              </a>
            ) : null}
          </div>

          {isVirtual ? (
            <div className="mt-5 rounded-[20px] border border-hairline bg-surface-1 p-6">
              <div className="flex items-start gap-4">
                <Monitor
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-brand"
                />
                <div>
                  <p className="text-lg font-semibold text-ink">
                    Microsoft Teams
                  </p>
                  <p className="mt-1 text-sm text-ink-muted sm:text-base">
                    The meeting link is sent to your email after registration.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 overflow-hidden rounded-[20px] border border-hairline bg-surface-1">
              <EventMap location={event.location} />
              <div className="flex items-start gap-4 border-t border-hairline p-6">
                <MapPin
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-brand"
                />
                <div>
                  <p className="text-[13px] tracking-[0.18em] text-brand uppercase">
                    Address
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---- Detail rail ---- */}
      <aside className="lg:sticky lg:top-[105px] lg:self-start">
        <div className="rounded-[20px] border border-hairline bg-surface-1 p-6 sm:p-8">
          <MetaRow
            icon={CalendarDays}
            label="Starts"
            value={formatDate(event.eventStartDate)}
            hint={formatTime(event.eventStartDate)}
          />
          {event.eventEndDate ? (
            <MetaRow
              icon={CalendarDays}
              label="Ends"
              value={formatDate(event.eventEndDate)}
            />
          ) : null}
          {event.registrationDeadline ? (
            <MetaRow
              icon={Clock}
              label="Register by"
              value={formatDate(event.registrationDeadline)}
              hint={formatTime(event.registrationDeadline)}
            />
          ) : null}

          {isOpen ? (
            <div className="mt-6 border-t border-hairline pt-6">
              <p className="text-lg font-semibold text-ink sm:text-xl">
                {userIsRegistered ? "You're all set" : "Ready to join?"}
              </p>
              <p className="mt-1 text-sm text-ink-muted sm:text-base">
                {userIsRegistered
                  ? "You're registered — see you there."
                  : isPastDeadline
                    ? "The registration deadline has passed."
                    : "Register now to secure your spot."}
              </p>

              {!userIsRegistered ? (
                <div className="mt-5">
                  <EventRegistrationModal
                    eventId={event.id}
                    eventTitle={event.title}
                    isPastDeadline={isPastDeadline}
                    eventPrice={eventPrice}
                    isPaidEvent={event.isPaid}
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {isPastEvent ? (
            <div className="mt-6 border-t border-hairline pt-6">
              <p className="text-lg font-semibold text-ink">
                This event has ended
              </p>
              <p className="mt-1 text-sm text-ink-muted sm:text-base">
                It now appears under past events and is no longer accepting
                registrations.
              </p>
            </div>
          ) : null}
        </div>

        {isOpen && isVirtual && event.teamsMeetingUrl && userIsRegistered ? (
          <a
            href={event.teamsMeetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-brand px-6 text-sm font-bold tracking-[0.02em] text-white uppercase no-underline transition-colors hover:bg-brand-deep sm:text-base"
          >
            <Video aria-hidden className="size-5" />
            Join Teams meeting
          </a>
        ) : null}

        {isOpen ? (
          <ol className="mt-8">
            {[
              { step: "Register", text: "Fill out the form." },
              { step: "Confirm", text: "Check your email." },
              {
                step: "Attend",
                text: isVirtual
                  ? "Join with the link we send you."
                  : "Come to the event location.",
              },
            ].map((item, index) => (
              <li
                key={item.step}
                className="flex items-start gap-4 border-t border-hairline py-4 first:border-t-0"
              >
                <span className="text-sm font-bold text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-ink">
                  <span className="font-medium">{item.step}:</span> {item.text}
                </p>
              </li>
            ))}
          </ol>
        ) : null}

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-[0.02em] text-brand uppercase hover:text-brand-deep"
            >
              <QrCode aria-hidden className="size-4" />
              Invite guests with a QR code
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR code</DialogTitle>
              <DialogDescription>
                Scan to open this event page and register.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-sm text-ink-muted">{event.title}</p>
              {origin ? (
                <QRCodeSVG
                  value={`${origin}/events/${event.slug}`}
                  size={280}
                  level="H"
                  marginSize={2}
                />
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      </aside>
    </div>
  );
};

export default EventDetailClient;

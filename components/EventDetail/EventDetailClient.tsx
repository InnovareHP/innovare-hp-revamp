"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isRegisteredForEvent } from "@/lib/event-registration-storage";
import { formatDate, formatTime } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
  Monitor,
  Navigation,
  QrCode,
  User,
  Video,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EventRegistrationModal from "./EventRegistrationModal";

type EventWithRelations = Prisma.EventGetPayload<{
  include: { media: true; attendees: true; guests: true; expectations: true };
}>;

interface EventDetailClientProps {
  event: EventWithRelations;
}

const EventDetailClient = ({ event }: EventDetailClientProps) => {
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setUserIsRegistered(isRegisteredForEvent(event.id));
    setOrigin(window.location.origin);
  }, [event.id]);

  // useEffect(() => {
  //   const payment = searchParams.get("payment");
  //   if (payment === "success") {
  //     setUserIsRegistered(true);
  //     toast.success("Payment successful!", {
  //       description:
  //         "You have been registered for the event. Check your email for confirmation.",
  //     });
  //     window.history.replaceState({}, "", `/events/${event.slug}`);
  //   } else if (payment === "cancelled") {
  //     toast.info("Payment cancelled", {
  //       description: "Your registration was not completed.",
  //     });
  //     window.history.replaceState({}, "", `/events/${event.slug}`);
  //   }
  // }, [searchParams, event.slug]);

  // Geocode location using Nominatim (free OpenStreetMap service)
  useEffect(() => {
    const geocodeLocation = async () => {
      try {
        setIsLoadingMap(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            event.location
          )}&limit=1`,
          {
            headers: {
              "User-Agent": "InnovareHP-Events",
            },
          }
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setMapCoordinates({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          });
        }
      } catch (error) {
        console.error("Error geocoding location:", error);
      } finally {
        setIsLoadingMap(false);
      }
    };

    geocodeLocation();
  }, [event.location]);

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <CardContent className="h-full ">
      <div className="grid grid-cols-1 xl:grid-cols-2 space-y-4">
        <div className="space-y-6 lg:pr-6">
          <div className="relative w-full aspect-[2/1] overflow-hidden">
            <img
              src={event.media?.url ?? ""}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {event.isPaid && eventPrice && eventPrice > 0 ? (
                <Badge variant="secondary" className="gap-1">
                  <DollarSign className="w-3 h-3" />
                  {formatPrice(eventPrice)}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-300"
                >
                  Free
                </Badge>
              )}
              <Badge
                variant="outline"
                className={
                  event.eventType === "VIRTUAL"
                    ? "text-purple-600 border-purple-300 gap-1"
                    : "text-blue-600 border-blue-300 gap-1"
                }
              >
                <Monitor className="w-3 h-3" />
                {event.eventType === "VIRTUAL" ? "Virtual" : "Onsite"}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {event.title}
            </h1>
            {event.hostedBy && (
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">
                  Hosted by{" "}
                  <span className="text-slate-900 font-semibold">
                    {event.hostedBy}
                  </span>
                </span>
              </div>
            )}
            <p className="text-base leading-relaxed text-slate-600">
              {event.description}
            </p>
          </div>

          {event.expectations && event.expectations.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">
                What to Expect
              </h3>
              <ul className="space-y-2">
                {event.expectations.map((expectation) => (
                  <li
                    key={expectation.id}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm">{expectation.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <Card className="border-0 bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/30 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <CalendarDays className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Start Date
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {formatDate(event.eventStartDate)}
                    </p>
                    <p className="text-sm text-slate-600 font-medium">
                      {formatTime(event.eventStartDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {event.eventEndDate && (
              <Card className="border-0 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-blue-100/30 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        End Date
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatDate(event.eventEndDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {event.registrationDeadline && (
              <Card className="border-0 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-blue-100/30 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Registration Deadline
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatDate(event.registrationDeadline)}
                      </p>
                      <p className="text-sm text-slate-600 font-medium">
                        {formatTime(event.registrationDeadline)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Card className="border-0 cursor-pointer bg-gradient-to-br from-blue-50 via-slate-50/80 to-blue-100/30 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                        <QrCode className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          QR Code
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          Invite Guests
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>QR Code</DialogTitle>
                  <DialogDescription>
                    Scan this QR code to register or view event details
                  </DialogDescription>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-sm text-slate-500">
                      Event Title: {event.title}
                    </p>
                    <QRCodeSVG
                      value={`${origin}/events/${event.slug}`}
                      size={300}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-6 p-2 lg:pl-6 bg-gradient-to-br from-slate-50/50 to-blue-50/30 lg:border-l border-slate-200">
          {event.status === "PUBLISHED" && !isPastEvent && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 md:p-8 shadow-2xl">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {userIsRegistered ? "You're All Set!" : "Ready to Join?"}
                  </h3>
                  <p className="text-blue-100 text-sm md:text-base">
                    {userIsRegistered
                      ? "You're registered! See you there!"
                      : isPastDeadline
                        ? "Registration deadline has passed."
                        : "Register now to secure your spot!"}
                  </p>
                </div>

                {!userIsRegistered && (
                  <EventRegistrationModal
                    eventId={event.id}
                    eventTitle={event.title}
                    isPastDeadline={isPastDeadline}
                    eventPrice={eventPrice}
                    isPaidEvent={event.isPaid}
                  />
                )}
              </div>
            </div>
          )}
          {event.status === "PUBLISHED" &&
            !isPastEvent &&
            event.eventType === "VIRTUAL" &&
            event.teamsMeetingUrl && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  <div className="p-3 rounded-full bg-white/20">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">
                      Virtual Event — Microsoft Teams
                    </h3>
                    <p className="text-purple-100 text-sm">
                      {userIsRegistered
                        ? "You're registered. Click below to join when the event starts."
                        : "Register to receive the meeting details by email."}
                    </p>
                  </div>
                  {userIsRegistered && (
                    <Button
                      className="bg-white text-purple-700 hover:bg-purple-50 font-semibold gap-2"
                      onClick={() =>
                        window.open(event.teamsMeetingUrl!, "_blank")
                      }
                    >
                      <Video className="w-4 h-4" />
                      Join Microsoft Teams Meeting
                    </Button>
                  )}
                </div>
              </div>
            )}

          {event.status === "PUBLISHED" && !isPastEvent && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">How to Join</h3>
              <Card className="border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-white shadow-sm">
                <CardContent className="pt-4 pb-4">
                  <div className="space-y-3">
                    <div className="flex gap-2 items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <p className="text-slate-700 text-sm">
                        <span className="font-semibold">Register:</span> Fill
                        out the form below
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <p className="text-slate-700 text-sm">
                        <span className="font-semibold">Confirm:</span> Check
                        your email
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <p className="text-slate-700 text-sm">
                        <span className="font-semibold">Attend:</span> Be
                        present at the event location
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {isPastEvent && (
            <Card className="border-amber-200 bg-amber-50 shadow-sm">
              <CardContent className="pt-5">
                <h3 className="text-lg font-bold text-slate-900">
                  This event has ended
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  This activity now appears in the Past Events section and is no
                  longer accepting registrations.
                </p>
              </CardContent>
            </Card>
          )}
          <div className="space-y-4">
            {event.eventType === "VIRTUAL" ? (
              <>
                <h3 className="text-xl font-bold text-slate-900">
                  Meeting Details
                </h3>
                <Card className="overflow-hidden border-2 shadow-lg">
                  <CardContent className="p-5 bg-gradient-to-br from-purple-50/50 to-white">
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 mb-1">
                          Platform
                        </p>
                        <p className="text-slate-900 font-medium text-base">
                          Microsoft Teams
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          The meeting link will be sent to your email after
                          registration.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Event Location
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                    onClick={() =>
                      window.open(googleMapsDirectionsUrl, "_blank")
                    }
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </Button>
                </div>

                <Card className="overflow-hidden border-2 shadow-lg">
                  {isLoadingMap ? (
                    <div className="relative w-full h-[300px] bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-slate-600 font-medium">
                          Loading map...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative w-full h-[300px] bg-slate-100">
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          title="Event Location Map"
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            event.location
                          )}&output=embed`}
                          className="w-full h-full"
                        />
                      </div>
                      <CardContent className="p-5 bg-gradient-to-br from-blue-50/50 to-white">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700 mb-1">
                              Address
                            </p>
                            <p className="text-slate-900 font-medium text-base">
                              {event.location}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              © OpenStreetMap contributors
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() =>
                              window.open(
                                `https://www.openstreetmap.org/?mlat=${mapCoordinates?.lat}&mlon=${mapCoordinates?.lon}#map=16/${mapCoordinates?.lat}/${mapCoordinates?.lon}`,
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default EventDetailClient;

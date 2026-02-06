"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isRegisteredForEvent } from "@/lib/event-registration-storage";
import { formatDate, formatTime } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import {
  Calendar,
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  QrCode,
  Users,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
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
  include: { media: true; attendees: true; guests: true };
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

  // Check localStorage on mount
  useEffect(() => {
    setUserIsRegistered(isRegisteredForEvent(event.id));
  }, [event.id]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "default";
      case "DRAFT":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      case "COMPLETED":
        return "outline";
      default:
        return "default";
    }
  };

  const isPastDeadline = event.registrationDeadline
    ? new Date() > new Date(event.registrationDeadline)
    : false;

  // Generate URLs
  const encodedLocation = encodeURIComponent(event.location);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  return (
    <CardContent className="p-0 bg-none">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Column - Event Details */}
        <div className="space-y-6 p-8 lg:pr-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={getStatusColor(event.status)}
                className="text-xs font-semibold px-3 py-1"
              >
                {event.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {event.title}
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              {event.description}
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <p className="text-sm text-slate-600 font-medium">
                        {formatTime(event.eventEndDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 bg-gradient-to-br from-blue-50 via-sky-50/80 to-blue-100/30 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-lg font-bold text-slate-900 leading-snug">
                      {event.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 via-cyan-50/80 to-blue-100/30 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Registered Attendees
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {event.attendees.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                      value={`${window.location.origin}/events/${event.id}`}
                      size={300}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          {event.status === "PUBLISHED" && (
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
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - How to Join, Map, Registration */}
        <div className="space-y-6 p-8 lg:pl-6 bg-gradient-to-br from-slate-50/50 to-blue-50/30 lg:border-l border-slate-200">
          {/* How to Join Section */}
          {event.status === "PUBLISHED" && (
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
                        <span className="font-semibold">Attend:</span> Arrive
                        10-15 min early
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Location Map Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-900">
                Event Location
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                onClick={() => window.open(googleMapsDirectionsUrl, "_blank")}
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
                    <p className="text-slate-600 font-medium">Loading map...</p>
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
          </div>

          {/* Registration CTA Section */}
        </div>
      </div>
    </CardContent>
  );
};

export default EventDetailClient;

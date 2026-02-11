"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@/generated/prisma/client";
import { isRegisteredForEvent } from "@/lib/event-registration-storage";
import { formatDate, formatTime } from "@/lib/utils";
import {
  Calendar,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  QrCode,
  Users,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EventRegistrationModal from "./EventRegistrationModal";

type EventWithRelations = Prisma.EventGetPayload<{
  include: { media: true; attendees: true; guests: true };
}>;

interface EventDetailClientProps {
  event: EventWithRelations;
}

const EventDetailClient = ({ event }: EventDetailClientProps) => {
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const searchParams = useSearchParams();

  // Check localStorage on mount
  useEffect(() => {
    setUserIsRegistered(isRegisteredForEvent(event.id));
  }, [event.id]);

  // Handle payment query params
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setUserIsRegistered(true);
      toast.success("Payment successful!", {
        description: "You have been registered for the event. Check your email for confirmation.",
      });
      window.history.replaceState({}, "", `/events/${event.id}`);
    } else if (payment === "cancelled") {
      toast.info("Payment cancelled", {
        description: "Your registration was not completed.",
      });
      window.history.replaceState({}, "", `/events/${event.id}`);
    }
  }, [searchParams, event.id]);

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

  const isEventFull =
    event.maxGuests > 0 && event.attendees.length >= event.maxGuests;
  const spotsLeft =
    event.maxGuests > 0 ? event.maxGuests - event.attendees.length : null;
  const isPastDeadline = event.registrationDeadline
    ? new Date() > new Date(event.registrationDeadline)
    : false;

  const eventPrice = event.price ? Number(event.price) : null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getStatusColor(event.status)}>
                {event.status}
              </Badge>
              {isEventFull && (
                <Badge variant="destructive">
                  <Users className="w-3 h-3" />
                  Full
                </Badge>
              )}
              {event.isPaid && eventPrice && eventPrice > 0 ? (
                <Badge variant="secondary" className="gap-1">
                  <DollarSign className="w-3 h-3" />
                  {formatPrice(eventPrice)}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Free
                </Badge>
              )}
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {event.title}
            </CardTitle>
          </div>
        </div>

        <CardDescription className="text-base leading-relaxed">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Start Date
                  </p>
                  <p className="font-semibold">
                    {formatDate(event.eventStartDate)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(event.eventStartDate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {event.eventEndDate && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      End Date
                    </p>
                    <p className="font-semibold">
                      {formatDate(event.eventEndDate)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(event.eventEndDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Capacity
                  </p>
                  <p className="font-semibold">
                    {event.attendees.length}
                    {event.maxGuests > 0 && ` / ${event.maxGuests}`}
                    {spotsLeft !== null && spotsLeft > 0 && (
                      <span className="text-sm text-muted-foreground ml-2">
                        ({spotsLeft} spots left)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {event.registrationDeadline && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Registration Deadline
                    </p>
                    <p className="font-semibold">
                      {formatDate(event.registrationDeadline)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTime(event.registrationDeadline)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {event.qrCode && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <QrCode className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      QR Code
                    </p>
                    <p className="font-semibold">Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator />

        {/* Registration Button */}
        {event.status === "PUBLISHED" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                Ready to join this event?
              </h3>
              <p className="text-muted-foreground">
                {isEventFull
                  ? "This event has reached maximum capacity."
                  : isPastDeadline
                    ? "Registration deadline has passed."
                    : "Register now to secure your spot!"}
              </p>
            </div>
            {userIsRegistered ? (
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  You are already registered for this event.
                </h3>
              </div>
            ) : (
              <EventRegistrationModal
                eventId={event.id}
                eventTitle={event.title}
                isEventFull={isEventFull}
                isPastDeadline={isPastDeadline}
                eventPrice={eventPrice}
                isPaidEvent={event.isPaid}
              />
            )}
          </div>
        )}
      </CardContent>
    </>
  );
};

export default EventDetailClient;

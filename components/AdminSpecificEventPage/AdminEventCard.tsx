import { ActionResponse } from "@/lib/types";
import { Prisma } from "@prisma/client";
import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AdminSpecificEventPage from "./AdminSpecificEventPage";

type Props = {
  event: Promise<
    ActionResponse<
      Prisma.EventGetPayload<{
        include: { media: true; attendees: true; guests: true; expectations: true };
      }>
    >
  >;
};
const AdminEventCard = ({ event }: Props) => {
  const eventData = use(event);

  return (
    <Card className="overflow-hidden">
      {eventData.data?.media && (
        <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/5">
          {eventData.data.media ? (
            <img
              width={1000}
              height={1000}
              src={eventData.data.media.url}
              alt={eventData.data.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Event Media</p>
            </div>
          )}
        </div>
      )}

      <CardHeader className="border-b">
        <CardTitle>{eventData.data?.title}</CardTitle>
        <CardDescription>Event Details</CardDescription>
      </CardHeader>
      <CardContent>
        <AdminSpecificEventPage
          event={
            eventData.data as Prisma.EventGetPayload<{
              include: { media: true; attendees: true; guests: true; expectations: true };
            }>
          }
        />
      </CardContent>
    </Card>
  );
};

export default AdminEventCard;

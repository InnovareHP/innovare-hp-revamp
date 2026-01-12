import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { use } from "react";

interface EventWithMedia {
  id: string;
  title: string;
  description: string;
  date: Date; // End Date/Time
  location: string;
  status: string;
  qrCode: string;
  eventStartDate: Date; // Start Date/Time
  media: {
    id: string;
    url: string;
  };
}

const EventsPage = ({ events }: { events: Promise<EventWithMedia[]> }) => {
  const eventsData = use(events);
  return (
    <div className="bg-background min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
              Events <span className="text-primary">Calendar</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Discover what's happening in your community.
            </p>
          </div>
          <CalendarDays className="w-8 h-8 text-primary/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {eventsData.map((event) => (
            <div key={event.id} className="group flex flex-col cursor-pointer">
              <Card className="border-none shadow-none bg-transparent mb-5 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={event.media.url}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-5">
                <div className="flex flex-col items-center min-w-[45px]">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    {format(event.eventStartDate, "MMM")}
                  </span>
                  <span className="text-3xl font-black text-slate-900 leading-none">
                    {format(event.eventStartDate, "dd")}
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                    <span className="uppercase tracking-wide">
                      {format(event.eventStartDate, "h:mm a")} -{" "}
                      {format(event.date, "h:mm a")}
                    </span>
                    {event.qrCode && (
                      <ExternalLink className="w-3 h-3 text-primary" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground/80">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

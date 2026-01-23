import EventsPage from "@/components/EventsPage/EventsPage";
import Navigation from "@/components/LandingPage/Navigation/Navigation";
import { CalendarDays } from "lucide-react";
import { Suspense } from "react";
import { getEvents } from "./action/eventaction";

const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page, limit } = (await searchParams) ?? { page: "1", limit: "10" };
  const events = getEvents(Number(limit ?? 10), Number(page ?? 1));

  return (
    <>
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
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
        <Suspense
          fallback={
            <div className="text-center text-muted-foreground text-2xl font-bold">
              Loading...
            </div>
          }
        >
          <EventsPage
            events={Promise.resolve(
              (await events).data ?? { events: [], totalPages: 0, page: 1 }
            )}
          />
        </Suspense>
      </div>
    </>
  );
};

export default page;

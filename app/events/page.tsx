import Navigation from "@/components/LandingPage/Navigation/Navigation";
import { ArrowRight, Clock, MapPin, Ticket } from "lucide-react";

// Dummy Data
const EVENTS = [
  {
    id: 1,
    title: "Vlog Mastery Workshop",
    date: "Jan 24, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Online / Zoom",
    status: "LIVE",
    image: "https://picsum.photos/id/1/800/600",
    description:
      "An intensive session on storytelling and advanced editing techniques for long-form content creators.",
  },
  {
    id: 2,
    title: "Creator Meetup: Manila",
    date: "Feb 12, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "BGC, Taguig City",
    status: "UPCOMING",
    image: "https://picsum.photos/id/12/800/600",
    description:
      "Networking night for video editors, brand owners, and content strategists to discuss the future of VSLs.",
  },
  {
    id: 3,
    title: "The Edit Summit 2026",
    date: "March 05, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "SMX Convention Center",
    status: "UPCOMING",
    image: "https://picsum.photos/id/20/800/600",
    description:
      "A full-day conference featuring the industry's top editors showcasing the latest AI-integration workflows.",
  },
];

const EventsPage = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900 pb-24">
      <Navigation />
      {/* HEADER */}
      <section className="relative py-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-blue-500" />
            <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-blue-600">
              Scheduled Events
            </span>
            <div className="h-px w-12 bg-blue-500" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">
            UPCOMING <span className="text-blue-600">HAPPENINGS</span>
          </h1>

          <p className="text-2xl md:text-4xl text-slate-500">Save the date</p>
        </div>
      </section>

      {/* EVENTS */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="space-y-12">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="group flex flex-col lg:flex-row gap-8 bg-white border border-slate-200 p-6 md:p-8 rounded-[2.5rem] hover:border-blue-400 hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="w-full lg:w-[400px] aspect-video lg:aspect-square rounded-[2rem] overflow-hidden shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 py-4">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${
                        event.status === "LIVE"
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {event.status}
                    </span>

                    <p className="text-slate-400 font-mono text-sm">
                      {event.date}
                    </p>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>

                  <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {event.location}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-8">
                  <button className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.2em] text-blue-600 hover:text-blue-800 transition-colors group/btn">
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Ticket className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">
                      Limited Slots
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;

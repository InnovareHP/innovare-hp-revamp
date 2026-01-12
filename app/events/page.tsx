import EventsPage from "@/components/EventsPage/EventsPage";
import { getEvents } from "./action/eventaction";

const page = async () => {
  const events = getEvents();
  return <EventsPage events={events} />;
};

export default page;

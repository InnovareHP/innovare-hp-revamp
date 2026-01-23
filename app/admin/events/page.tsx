import AddEventButton from "@/components/AdminEventsPage/AddEventButton";
import AdminEventPage from "@/components/AdminEventsPage/AdminEventsPage";
import { requireAdmin } from "@/lib/auth-utils";
import { getEventsAuthenticated } from "./action";

type Props = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

const page = async ({ searchParams }: Props) => {
  await requireAdmin();

  const { page, limit } = (await searchParams) ?? { page: "1", limit: "10" };
  const events = getEventsAuthenticated(Number(limit ?? 10), Number(page ?? 1));

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">List of All Events</h2>
          <p className="text-sm text-muted-foreground">
            Manage and view all events in the system.
          </p>
        </div>

        <AddEventButton />
      </div>

      <AdminEventPage
        events={Promise.resolve(
          (await events).data ?? { events: [], totalPages: 0, page: 1 }
        )}
      />
    </section>
  );
};

export default page;

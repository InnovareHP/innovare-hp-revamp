import AddEventButton from "@/components/AdminEventsPage/AddEventButton";
import { AdminTableSkeleton } from "@/components/ReusableTable/ReusableTableSkeleton";

export default function Loading() {
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
      <AdminTableSkeleton />
    </section>
  );
}

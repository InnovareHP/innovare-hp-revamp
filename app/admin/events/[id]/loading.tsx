import AdminEventSkeleton from "@/components/AdminSpecificEventPage/AdminEventSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * Loading state for admin event detail page
 * Automatically shown during route transitions and data fetching
 */
export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        <Button variant="outline" className="mb-6 gap-2" disabled>
          <ArrowLeft className="w-4 h-4" />
          Back to Events Table
        </Button>

        <AdminEventSkeleton />
      </div>
    </div>
  );
}

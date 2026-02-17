import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading component for Admin Event Detail Page
 * Matches the layout of AdminSpecificEventPage and AdminEventCard
 */
export default function AdminEventSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Hero Image Skeleton */}
      <Skeleton className="relative w-full h-64 md:h-96 rounded-none" />

      <CardHeader className="border-b">
        <div className="space-y-6">
          {/* Admin Action Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24" /> {/* Status badge */}
              <Skeleton className="h-4 w-32" /> {/* Created date */}
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Skeleton className="h-9 w-24 flex-1 md:flex-none" />{" "}
              {/* Export button */}
              <Skeleton className="h-9 w-20 flex-1 md:flex-none" />{" "}
              {/* Edit button */}
              <Skeleton className="h-9 w-24 flex-1 md:flex-none" />{" "}
              {/* Delete button */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Column Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  {/* Title and Description */}
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
                <CardContent>
                  {/* Tabs Skeleton */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Table Skeleton */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-4 pb-3 border-b">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 py-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-8 w-8 ml-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Analytics Column Skeleton */}
            <div className="space-y-6">
              {/* Capacity Overview Card */}
              <Card className="border-amber-200 bg-amber-50/30">
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <Skeleton className="h-10 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="w-full h-2 rounded-full" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Status Card */}
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="w-full h-px" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

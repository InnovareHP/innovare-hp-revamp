/**
 * Reusable Table Skeleton Loader
 *
 * A skeleton loading component that matches the ReusableTable layout.
 * Use this for loading states before data is fetched.
 *
 * @example
 * ```tsx
 * import ReusableTableSkeleton from "@/components/ReusableTable/ReusableTableSkeleton";
 *
 * {loading ? (
 *   <ReusableTableSkeleton
 *     columns={5}
 *     rows={10}
 *     showHeader
 *     showSearch
 *   />
 * ) : (
 *   <ReusableTable data={data} columns={columns} />
 * )}
 * ```
 */

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ReusableTableSkeletonProps {
  /** Number of columns to show */
  columns?: number;
  /** Number of rows to show */
  rows?: number;
  /** Show header section with title and search */
  showHeader?: boolean;
  /** Show search bar in header */
  showSearch?: boolean;
  /** Show pagination footer */
  showPagination?: boolean;
  /** Compact mode (reduced padding) */
  compact?: boolean;
  /** Show striped rows */
  striped?: boolean;
  /** Custom className for wrapper */
  className?: string;
}

export default function ReusableTableSkeleton({
  columns = 5,
  rows = 10,
  showHeader = false,
  showSearch = false,
  showPagination = true,
  compact = false,
  striped = false,
  className,
}: ReusableTableSkeletonProps) {
  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Header Section */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Title */}
          <Skeleton className="h-7 w-48" />

          {/* Search and Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {showSearch && <Skeleton className="h-10 w-full sm:w-80" />}
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      )}

      {/* Table Section - Enhanced Design */}
      <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            {/* Table Header - Enhanced Gradient */}
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 border-b-2 border-border/50">
                {[...Array(columns)].map((_, i) => (
                  <TableHead
                    key={i}
                    className={cn(
                      "px-6 py-4 first:pl-8 last:pr-8",
                      compact && "px-3 py-2"
                    )}
                  >
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body - Enhanced Rows */}
            <TableBody>
              {[...Array(rows)].map((_, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={cn(
                    "animate-pulse border-b border-border/40",
                    rowIndex % 2 === 0 && "bg-card/30"
                  )}
                >
                  {[...Array(columns)].map((_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn(
                        "px-6 py-4 first:pl-8 last:pr-8",
                        compact && "px-3 py-2"
                      )}
                    >
                      <Skeleton
                        className={cn(
                          "h-4",
                          // Vary widths for more realistic look
                          colIndex === 0 && "w-32",
                          colIndex === 1 && "w-48",
                          colIndex === 2 && "w-24",
                          colIndex === 3 && "w-16",
                          colIndex >= 4 && "w-20"
                        )}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Section - Enhanced */}
      {showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-card/30 rounded-xl border border-border/40">
          {/* Results Summary */}
          <Skeleton className="h-4 w-64" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-9 w-24 rounded-lg" /> {/* Previous */}
            <Skeleton className="h-9 w-10 rounded-lg" />  {/* Page 1 */}
            <Skeleton className="h-9 w-10 rounded-lg" />  {/* Page 2 */}
            <Skeleton className="h-9 w-10 rounded-lg" />  {/* Page 3 */}
            <Skeleton className="h-9 w-24 rounded-lg" /> {/* Next */}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Preset configurations for common use cases
 */

/** Admin table with all features */
export function AdminTableSkeleton() {
  return (
    <ReusableTableSkeleton
      columns={6}
      rows={10}
      showHeader
      showSearch
      showPagination
    />
  );
}

/** Simple data table */
export function SimpleTableSkeleton() {
  return (
    <ReusableTableSkeleton
      columns={4}
      rows={8}
      showHeader={false}
      showSearch={false}
      showPagination
    />
  );
}

/** Compact table for sidebars */
export function CompactTableSkeleton() {
  return (
    <ReusableTableSkeleton
      columns={3}
      rows={5}
      showHeader={false}
      showSearch={false}
      showPagination={false}
      compact
    />
  );
}

/** Events table preset */
export function EventsTableSkeleton() {
  return (
    <ReusableTableSkeleton
      columns={6}
      rows={10}
      showHeader
      showSearch
      showPagination
      striped
    />
  );
}

/** Attendees table preset */
export function AttendeesTableSkeleton() {
  return (
    <ReusableTableSkeleton
      columns={4}
      rows={5}
      showHeader={false}
      showSearch={false}
      showPagination={false}
    />
  );
}

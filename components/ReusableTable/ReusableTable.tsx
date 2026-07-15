"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FileX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export type ColumnDef<T> = {
  key: string;
  header: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  cell?: (row: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  emptyMessage?: string;
  itemsPerPage?: number;
  totalPages?: number;
  currentPage?: number;
  /**
   * Set true when `data` is already sliced to the current page server-side
   * (e.g. Prisma take/skip). Skips the internal client-side slice so pages
   * past the first aren't blanked out.
   */
  manualPagination?: boolean;
  /** Total row count across all pages (for the "Showing X of Y" summary in manual mode). */
  totalItems?: number;
};

export default function ReusableTable<T>({
  data,
  columns,
  emptyMessage = "No data found.",
  itemsPerPage = 10,
  totalPages = 1,
  currentPage = 1,
  manualPagination = false,
  totalItems,
}: ReusableTableProps<T>) {
  const router = useRouter();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = manualPagination
    ? data
    : data.slice(startIndex, startIndex + itemsPerPage);
  const totalCount = manualPagination ? (totalItems ?? data.length) : data.length;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?page=${page}`, { scroll: false });
    } else {
      router.push(`?page=${totalPages}`, { scroll: false });
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Table Container with Enhanced Design */}
      <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            {/* Enhanced Table Header */}
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 hover:from-muted/90 hover:via-muted/70 hover:to-muted/90 border-b-2 border-border/50">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "font-semibold text-foreground/80 text-xs uppercase tracking-wide px-6 py-4 first:pl-8 last:pr-8",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.className
                    )}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                // Enhanced Empty State
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    className="h-80 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4 py-12">
                      <div className="rounded-full bg-muted/50 p-6 ring-4 ring-muted/30">
                        <FileX className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-semibold text-foreground/70">
                          {emptyMessage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          No records to display at this time
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                // Enhanced Table Rows
                paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={cn(
                      "transition-all duration-200 border-b border-border/40",
                      "hover:bg-muted/40 hover:shadow-sm",
                      "group relative",
                      rowIndex % 2 === 0 && "bg-card/30"
                    )}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className={cn(
                          "px-6 py-4 first:pl-8 last:pr-8 text-sm font-medium text-foreground/90",
                          col.align === "right" && "text-right",
                          col.align === "center" && "text-center",
                          col.className
                        )}
                      >
                        {col.cell ? col.cell(row) : (row as any)[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-card/30 rounded-xl border border-border/40">
          {/* Results Summary with Better Styling */}
          <p className="text-sm font-medium text-muted-foreground">
            Showing{" "}
            <span className="font-bold text-foreground px-1">
              {totalCount === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-foreground px-1">
              {manualPagination
                ? startIndex + paginatedData.length
                : Math.min(startIndex + itemsPerPage, data.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-foreground px-1">
              {totalCount}
            </span>{" "}
            results
          </p>

          {/* Enhanced Pagination Controls */}
          <Pagination className="w-auto mx-0">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={cn(
                    "rounded-lg transition-all duration-200",
                    currentPage === 1
                      ? "pointer-events-none opacity-40"
                      : "cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/20 hover:shadow-sm"
                  )}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        isActive={currentPage === pageNumber}
                        className={cn(
                          "rounded-lg transition-all duration-200 min-w-[2.5rem]",
                          currentPage === pageNumber
                            ? "bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90"
                            : "hover:bg-muted/60 hover:border-border hover:shadow-sm"
                        )}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <PaginationEllipsis
                      key={pageNumber}
                      className="text-muted-foreground/60"
                    />
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={cn(
                    "rounded-lg transition-all duration-200",
                    currentPage === totalPages
                      ? "pointer-events-none opacity-40"
                      : "cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/20 hover:shadow-sm"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

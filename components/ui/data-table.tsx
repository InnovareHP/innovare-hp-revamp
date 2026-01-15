/**
 * DataTable Component - Reusable Table for All Admin Pages
 *
 * A flexible, type-safe table component with built-in search, empty states, and loading states.
 *
 * @example Basic Usage
 * ```tsx
 * const columns: Column<User>[] = [
 *   { key: "name", header: "Name", accessor: (user) => user.name },
 *   { key: "email", header: "Email", accessor: (user) => user.email },
 * ];
 *
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   keyExtractor={(user) => user.id}
 * />
 * ```
 *
 * @example With Search
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState("");
 * const filteredData = useMemo(() =>
 *   data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
 *   [data, searchQuery]
 * );
 *
 * <DataTable
 *   data={filteredData}
 *   columns={columns}
 *   keyExtractor={(item) => item.id}
 *   searchable
 *   searchPlaceholder="Search by name..."
 *   searchValue={searchQuery}
 *   onSearchChange={setSearchQuery}
 * />
 * ```
 *
 * @example With Empty State
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   keyExtractor={(user) => user.id}
 *   emptyState={{
 *     icon: <Users className="h-12 w-12" />,
 *     title: "No users found",
 *     description: "Get started by creating your first user",
 *     action: <Button onClick={handleCreate}>Create User</Button>,
 *   }}
 * />
 * ```
 *
 * @example With Custom Rendering
 * ```tsx
 * const columns: Column<Event>[] = [
 *   {
 *     key: "title",
 *     header: "Title",
 *     render: (event) => (
 *       <div>
 *         <div className="font-medium">{event.title}</div>
 *         <div className="text-sm text-muted-foreground">{event.description}</div>
 *       </div>
 *     ),
 *   },
 *   {
 *     key: "status",
 *     header: "Status",
 *     render: (event) => (
 *       <span className="px-2 py-1 rounded-full bg-green-100">{event.status}</span>
 *     ),
 *   },
 *   {
 *     key: "actions",
 *     header: "Actions",
 *     align: "right",
 *     render: (event) => (
 *       <div className="flex gap-2 justify-end">
 *         <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
 *         <Button size="sm" onClick={() => handleDelete(event)}>Delete</Button>
 *       </div>
 *     ),
 *   },
 * ];
 * ```
 */

"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Column configuration for the DataTable
 * @template T - The type of data in each row
 */
export interface Column<T> {
  /** Unique identifier for the column */
  key: string;
  /** Column header text displayed in the table header */
  header: string;
  /** Simple accessor function to extract value from row. Use for basic text/number display */
  accessor?: (row: T) => ReactNode;
  /** Custom render function for complex JSX. Takes priority over accessor. Use for badges, links, etc. */
  render?: (row: T) => ReactNode;
  /** Alignment for cell content. Default: "left" */
  align?: "left" | "center" | "right";
  /** Alignment for header content. Default: inherits from align */
  headerAlign?: "left" | "center" | "right";
  /** Additional CSS classes for the cell */
  className?: string;
}

/**
 * Props for the DataTable component
 * @template T - The type of data in each row
 */
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  emptyState?: {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
  };
  loading?: boolean;
  loadingState?: ReactNode;
  headerAction?: ReactNode;
  keyExtractor: (row: T) => string | number;
  rowClassName?: string | ((row: T) => string);
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  title,
  searchable = false,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  emptyState,
  loading = false,
  loadingState,
  headerAction,
  keyExtractor,
  rowClassName,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const isEmpty = !loading && data.length === 0;

  return (
    <div
      className={cn(
        "w-full overflow-hidden border rounded-xl bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      {/* Header */}
      {(title || headerAction) && (
        <div className="p-4 border-b flex items-center justify-between">
          {title && (
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h3>
          )}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Search Bar */}
      {searchable && (
        <div className="border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-12">
          {loadingState || (
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {isEmpty && emptyState && (
        <div className="flex flex-col items-center justify-center p-12">
          {emptyState.icon && (
            <div className="mb-4 text-muted-foreground/50">{emptyState.icon}</div>
          )}
          <h3 className="text-lg font-semibold mb-2">{emptyState.title}</h3>
          {emptyState.description && (
            <p className="text-sm text-muted-foreground text-center mb-4 max-w-sm">
              {emptyState.description}
            </p>
          )}
          {emptyState.action && <div>{emptyState.action}</div>}
        </div>
      )}

      {/* Table */}
      {!loading && !isEmpty && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-6 py-3 text-sm font-medium text-muted-foreground",
                      column.headerAlign === "center" && "text-center",
                      column.headerAlign === "right" && "text-right",
                      !column.headerAlign && column.align === "center" && "text-center",
                      !column.headerAlign && column.align === "right" && "text-right",
                      (!column.headerAlign && !column.align) && "text-left"
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((row) => {
                const rowKey = keyExtractor(row);
                const computedRowClassName =
                  typeof rowClassName === "function"
                    ? rowClassName(row)
                    : rowClassName;

                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "hover:bg-muted/30 transition-colors",
                      onRowClick && "cursor-pointer",
                      computedRowClassName
                    )}
                  >
                    {columns.map((column) => {
                      let cellContent: ReactNode;

                      if (column.render) {
                        cellContent = column.render(row);
                      } else if (column.accessor) {
                        cellContent = column.accessor(row);
                      } else {
                        cellContent = (row as any)[column.key];
                      }

                      return (
                        <td
                          key={column.key}
                          className={cn(
                            "px-6 py-4 text-sm",
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right",
                            column.className
                          )}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Stats Card Component for dashboard-style layouts
export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

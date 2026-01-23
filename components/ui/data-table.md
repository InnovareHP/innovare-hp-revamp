# DataTable Component

A reusable, flexible table component for displaying tabular data with built-in search, empty states, and loading states.

## Features

- 🔍 **Built-in search** - Optional search functionality
- 📊 **Flexible columns** - Support for custom rendering and accessors
- 🎨 **Empty states** - Customizable empty state with icon and action
- ⚡ **Loading states** - Built-in loading state support
- 🎯 **Type-safe** - Full TypeScript support with generics
- 📱 **Responsive** - Mobile-friendly design
- 🎭 **Customizable** - Extensive styling options

## Installation

The component is located at `components/ui/data-table.tsx` and uses:
- `components/ui/input.tsx`
- `lucide-react` for icons
- `lib/utils.ts` for className utilities

## Basic Usage

```tsx
import { DataTable, Column } from "@/components/ui/data-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    accessor: (user) => user.name,
  },
  {
    key: "email",
    header: "Email",
    accessor: (user) => user.email,
  },
  {
    key: "role",
    header: "Role",
    accessor: (user) => user.role,
  },
];

export function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable
      data={users}
      columns={columns}
      keyExtractor={(user) => user.id}
    />
  );
}
```

## Column Definition

### Simple Column

```tsx
{
  key: "email",
  header: "Email",
  accessor: (user) => user.email,
}
```

### Custom Rendered Column

```tsx
{
  key: "status",
  header: "Status",
  render: (user) => (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs",
      user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    )}>
      {user.isActive ? "Active" : "Inactive"}
    </span>
  ),
}
```

### Right-Aligned Column

```tsx
{
  key: "amount",
  header: "Amount",
  accessor: (row) => `$${row.amount.toFixed(2)}`,
  align: "right",
}
```

### Actions Column

```tsx
{
  key: "actions",
  header: "Actions",
  align: "right",
  render: (user) => (
    <div className="flex items-center justify-end gap-2">
      <Button size="sm" variant="ghost" onClick={() => handleEdit(user)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={() => handleDelete(user)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  ),
}
```

## DataTable Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of data to display |
| `columns` | `Column<T>[]` | Column definitions |
| `keyExtractor` | `(row: T) => string \| number` | Function to extract unique key from each row |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Table title in header |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder text for search input |
| `searchValue` | `string` | - | Controlled search value |
| `onSearchChange` | `(value: string) => void` | - | Search change handler |
| `emptyState` | `EmptyState` | - | Empty state configuration |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingState` | `ReactNode` | - | Custom loading state component |
| `headerAction` | `ReactNode` | - | Action button/element in header |
| `rowClassName` | `string \| ((row: T) => string)` | - | Additional row classes |
| `onRowClick` | `(row: T) => void` | - | Row click handler |
| `className` | `string` | - | Additional table wrapper classes |

## Advanced Examples

### With Search

```tsx
const [searchQuery, setSearchQuery] = useState("");

const filteredData = useMemo(() => {
  if (!searchQuery) return data;
  return data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data, searchQuery]);

<DataTable
  data={filteredData}
  columns={columns}
  keyExtractor={(item) => item.id}
  searchable
  searchPlaceholder="Search by name..."
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

### With Empty State

```tsx
<DataTable
  data={users}
  columns={columns}
  keyExtractor={(user) => user.id}
  emptyState={{
    icon: <Users className="h-12 w-12" />,
    title: "No users found",
    description: "Get started by creating your first user",
    action: (
      <Button onClick={handleCreateUser}>
        <Plus className="mr-2 h-4 w-4" />
        Create User
      </Button>
    ),
  }}
/>
```

### With Loading State

```tsx
<DataTable
  data={users}
  columns={columns}
  keyExtractor={(user) => user.id}
  loading={isLoading}
  loadingState={
    <div className="animate-pulse">
      <Loader2 className="h-12 w-12 animate-spin" />
      <p>Loading users...</p>
    </div>
  }
/>
```

### With Row Click

```tsx
<DataTable
  data={products}
  columns={columns}
  keyExtractor={(product) => product.id}
  onRowClick={(product) => router.push(`/products/${product.id}`)}
/>
```

### With Header Action

```tsx
<DataTable
  data={events}
  columns={columns}
  keyExtractor={(event) => event.id}
  title="Events"
  headerAction={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Create Event
    </Button>
  }
/>
```

### Full Example (Events Page)

```tsx
"use client";

import { DataTable, StatCard, Column } from "@/components/ui/data-table";
import { useState, useMemo } from "react";

export default function EventsPage({ events }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const query = searchQuery.toLowerCase();
    return events.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  const columns: Column<Event>[] = [
    {
      key: "title",
      header: "Title",
      render: (event) => (
        <div>
          <div className="font-medium">{event.title}</div>
          <div className="text-sm text-muted-foreground">{event.description}</div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      accessor: (event) => format(new Date(event.date), "PPP"),
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "status",
      header: "Status",
      render: (event) => (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100">
          {event.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (event) => (
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="ghost">Edit</Button>
          <Button size="sm" variant="ghost">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <DataTable
        data={filteredEvents}
        columns={columns}
        keyExtractor={(event) => event.id}
        searchable
        searchPlaceholder="Search events..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        emptyState={{
          title: "No events found",
          description: "Create your first event to get started",
        }}
      />
    </div>
  );
}
```

## StatCard Component

A companion component for displaying statistics.

### Usage

```tsx
import { StatCard } from "@/components/ui/data-table";

<div className="grid gap-4 md:grid-cols-4">
  <StatCard
    label="Total Users"
    value={150}
    icon={<Users className="h-4 w-4" />}
  />
  <StatCard
    label="Revenue"
    value="$12,345"
    icon={<DollarSign className="h-4 w-4" />}
    trend={{ value: "+12%", isPositive: true }}
  />
</div>
```

## Column Configuration

### Column Interface

```typescript
interface Column<T> {
  key: string;                                  // Unique column identifier
  header: string;                               // Column header text
  accessor?: (row: T) => ReactNode;            // Simple value accessor
  render?: (row: T) => ReactNode;              // Custom render function
  align?: "left" | "center" | "right";         // Cell alignment
  headerAlign?: "left" | "center" | "right";   // Header alignment
  className?: string;                           // Additional cell classes
}
```

### Priority: render > accessor > key

1. If `render` is provided, it will be used
2. If `accessor` is provided, it will be used
3. Otherwise, `row[key]` will be used

## Styling

The component uses Tailwind CSS and follows shadcn/ui design patterns. You can customize:

- Border radius: `rounded-xl`
- Padding: `px-6 py-4`
- Colors: Uses CSS variables from your theme
- Hover states: `hover:bg-muted/30`

## Tips

1. **Use memoization** for filtered data to avoid unnecessary re-renders
2. **Stop propagation** on action buttons to prevent row click events
3. **Use accessor** for simple value extraction
4. **Use render** for complex JSX
5. **Provide meaningful empty states** to guide users

## Examples in Codebase

See the implementation in:
- `components/AdminEventsPage/AdminEventsPage.tsx` - Full example with search and stats

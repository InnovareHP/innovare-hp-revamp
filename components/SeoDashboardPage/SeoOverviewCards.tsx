"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSeoOverview } from "@/hooks/useSeoOverview";
import { Eye, LineChart, MousePointer2, Percent } from "lucide-react";

export function SeoOverviewCards() {
  const { data, isLoading } = useSeoOverview();

  const items = [
    {
      label: "Total Clicks",
      value: data?.clicks?.toLocaleString(),
      icon: MousePointer2,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Total Impressions",
      value: data?.impressions?.toLocaleString(),
      icon: Eye,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      label: "Avg. CTR",
      value: data?.ctr ? `${Number(data.ctr).toFixed(2)}%` : null,
      icon: Percent,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      label: "Avg. Position",
      value: data?.avgPosition ? Number(data.avgPosition).toFixed(1) : null,
      icon: LineChart,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="overflow-hidden border-none shadow-sm ring-1 ring-border"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {item.label}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {item.value ?? "0"}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

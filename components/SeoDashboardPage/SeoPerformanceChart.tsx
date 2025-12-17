"use client";

import { useSeoPerformance } from "@/hooks/useSeoOverview";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SeoPerformanceChart() {
  const { data, isLoading } = useSeoPerformance();

  // Calculate totals for the header display
  const totals = React.useMemo(() => {
    if (!data) return { clicks: 0, impressions: 0 };
    return data.reduce(
      (acc: any, curr: any) => ({
        clicks: acc.clicks + (curr.clicks || 0),
        impressions: acc.impressions + (curr.impressions || 0),
      }),
      { clicks: 0, impressions: 0 }
    );
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center border rounded-xl bg-muted/5 animate-pulse text-muted-foreground">
        Loading performance data...
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header with quick stats */}
      <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Search Performance
          </h3>
          <p className="text-sm text-muted-foreground">
            Clicks and Impressions over time
          </p>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              Total Clicks
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {totals.clicks.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              Total Impressions
            </span>
            <span className="text-2xl font-bold text-emerald-500">
              {totals.impressions.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data ?? []}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
                // Only show a few ticks if data is dense
                minTickGap={30}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

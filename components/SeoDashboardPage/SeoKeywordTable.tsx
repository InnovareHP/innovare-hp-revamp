"use client";

import { useSeoKeywords } from "@/hooks/useSeoOverview";

interface SeoKeyword {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export function SeoKeywordTable() {
  const { data, isLoading, error } = useSeoKeywords();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground animate-pulse">
        Loading keywords...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 border border-red-200 rounded-md bg-red-50">
        Failed to load SEO data.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Search Queries
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Performance metrics per keyword
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
            <tr>
              <th className="px-4 py-3 font-medium">Keyword</th>
              <th className="px-4 py-3 font-medium text-right">Clicks</th>
              <th className="px-4 py-3 font-medium text-right">Impressions</th>
              <th className="px-4 py-3 font-medium text-right">CTR</th>
              <th className="px-4 py-3 font-medium text-right">Position</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.map((k: SeoKeyword) => (
              <tr key={k.query} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">
                  {k.query}
                </td>
                <td className="px-4 py-3 text-right">
                  {k.clicks.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {k.impressions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {(k.ctr * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-bold">
                    {k.position.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!data?.length && (
        <div className="p-8 text-center text-muted-foreground">
          No keyword data available for this period.
        </div>
      )}
    </div>
  );
}

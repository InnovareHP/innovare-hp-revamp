"use client";

import { useSeoPages } from "@/hooks/useSeoOverview";
import { ExternalLink } from "lucide-react"; // Optional: if you have lucide-react installed

interface SeoPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export function SeoPageTable() {
  const { data, isLoading } = useSeoPages();

  // Helper to make URLs more readable (removes protocol and domain if preferred)
  const formatUrl = (url: string) => {
    try {
      const path = new URL(url).pathname + new URL(url).hash;
      return path === "/" ? "Home" : path;
    } catch {
      return url;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Loading pages...
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border rounded-xl bg-card shadow-sm">
      <div className="p-4 border-b bg-muted/20">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          Top Pages
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Landing page performance by search traffic
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
            <tr>
              <th className="px-4 py-3 font-semibold">Page Path</th>
              <th className="px-4 py-3 font-semibold text-right">Clicks</th>
              <th className="px-4 py-3 font-semibold text-right">
                Impressions
              </th>
              <th className="px-4 py-3 font-semibold text-right">CTR</th>
              <th className="px-4 py-3 font-semibold text-right">Avg. Pos</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.map((p: SeoPage) => (
              <tr
                key={p.page}
                className="group hover:bg-muted/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-blue-600 dark:text-blue-400 truncate max-w-[240px]">
                      {formatUrl(p.page)}
                    </span>
                    <a
                      href={p.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {p.clicks}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {p.impressions}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {p.ctr.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      p.position <= 3
                        ? "bg-green-100 text-green-700"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {p.position.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

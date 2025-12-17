"use client";

import { useSeoIssues } from "@/hooks/useSeoOverview";

export function SeoIssuesPanel() {
  const { data, isLoading } = useSeoIssues();

  if (isLoading) {
    return <div className="p-4">Analyzing SEO issues…</div>;
  }

  if (!data?.length) {
    return (
      <div className="border rounded-lg p-4 bg-green-50 text-green-700">
        No major SEO issues detected 🎉
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-red-50">
      <h3 className="font-medium mb-2 text-red-700">SEO Issues</h3>

      <ul className="space-y-2 text-sm">
        {data.map((issue: any, i: number) => (
          <li key={i} className="flex gap-2">
            <span
              className={`font-semibold ${
                issue.severity === "high"
                  ? "text-red-600"
                  : issue.severity === "medium"
                    ? "text-orange-500"
                    : "text-yellow-600"
              }`}
            >
              {issue.severity.toUpperCase()}
            </span>
            <span>{issue.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

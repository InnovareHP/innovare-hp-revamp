import { SeoIssuesPanel } from "./SeoIssuesPanel";
import { SeoKeywordTable } from "./SeoKeywordTable";
import { SeoOverviewCards } from "./SeoOverviewCards";
import { SeoPageTable } from "./SeoPageTable";
import { SeoPerformanceChart } from "./SeoPerformanceChart";

export default function SeoDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">SEO Dashboard</h1>

      <SeoOverviewCards />

      <SeoPerformanceChart />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SeoKeywordTable />
        <SeoPageTable />
      </div>

      <SeoIssuesPanel />
    </div>
  );
}

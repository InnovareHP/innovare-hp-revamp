import { auth } from "@/lib/google";
import { NextResponse } from "next/server";

type SeoIssue = {
  type: string;
  message: string;
  severity: "low" | "medium" | "high";
};

export async function GET() {
  try {
    const { access_token } = await auth.authorize();
    if (!access_token) throw new Error("No access token");

    const siteUrl = encodeURIComponent("sc-domain:innovarehp.com");

    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: "2024-12-01",
          endDate: "2024-12-18",
          dimensions: ["query", "page"],
          rowLimit: 250,
        }),
      }
    );

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();

    const issues: SeoIssue[] = [];

    for (const row of data.rows ?? []) {
      const query = row.keys[0];
      const page = row.keys[1];

      // 🔴 High impressions, low CTR
      if (row.impressions > 50 && row.ctr < 0.01) {
        issues.push({
          type: "LOW_CTR",
          severity: "medium",
          message: `Low CTR for "${query}" on ${page}`,
        });
      }

      // 🟠 Poor ranking
      if (row.position > 30) {
        issues.push({
          type: "LOW_RANK",
          severity: "low",
          message: `"${query}" ranks low (avg position ${row.position.toFixed(
            1
          )})`,
        });
      }

      // 🔴 Zero clicks opportunity
      if (row.impressions > 20 && row.clicks === 0) {
        issues.push({
          type: "ZERO_CLICKS",
          severity: "high",
          message: `No clicks for "${query}" despite impressions`,
        });
      }
    }

    return NextResponse.json(issues.slice(0, 20)); // limit noise
  } catch (error: any) {
    console.error("SEO ISSUES ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

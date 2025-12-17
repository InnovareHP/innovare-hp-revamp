import { auth } from "@/lib/google";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1️⃣ Get access token
    const { access_token } = await auth.authorize();

    if (!access_token) {
      throw new Error("Failed to get Google access token");
    }

    const siteUrl = encodeURIComponent("sc-domain:innovarehp.com");

    // 3️⃣ Call Google Search Console API
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
          endDate: "2025-12-01",
          dimensions: ["query", "page"],
          rowLimit: 250,
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();

    // 4️⃣ Aggregate metrics
    let clicks = 0;
    let impressions = 0;
    let positionSum = 0;
    let rowCount = 0;

    for (const row of data.rows ?? []) {
      clicks += row.clicks;
      impressions += row.impressions;
      positionSum += row.position;
      rowCount++;
    }

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    const avgPosition = rowCount > 0 ? positionSum / rowCount : 0;

    // 5️⃣ Return dashboard-friendly response
    return NextResponse.json({
      clicks,
      impressions,
      ctr: Number(ctr.toFixed(2)),
      avgPosition: Number(avgPosition.toFixed(2)),
    });
  } catch (error: any) {
    console.error("SEO API ERROR:", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

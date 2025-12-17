import { auth } from "@/lib/google";
import { NextResponse } from "next/server";

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
          endDate: "2025-12-01",
          dimensions: ["query"],
          rowLimit: 50,
          orderBy: [{ field: "clicks", direction: "descending" }],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();

    // Normalize response
    const keywords =
      data.rows?.map((row: any) => ({
        query: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: Number((row.ctr * 100).toFixed(2)),
        position: Number(row.position.toFixed(1)),
      })) ?? [];

    return NextResponse.json(keywords);
  } catch (error: any) {
    console.error("SEO KEYWORDS ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

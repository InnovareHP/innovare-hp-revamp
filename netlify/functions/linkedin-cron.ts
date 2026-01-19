export const runtime = "nodejs";

import { fetchLinkedInPosts } from "@/lib/integration";
import { NextResponse } from "next/server";

async function runLinkedInCron() {
  await fetchLinkedInPosts();
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  await runLinkedInCron();
  return NextResponse.json({ ok: true });
}

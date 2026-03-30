export const runtime = "nodejs";

import { syncPastEvents } from "@/lib/event-cron";
import { NextResponse } from "next/server";

async function runEventCron() {
  return syncPastEvents();
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const result = await runEventCron();

  return NextResponse.json({
    ok: true,
    job: "event-status-cron",
    ...result,
  });
}

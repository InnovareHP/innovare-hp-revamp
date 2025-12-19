export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { fetchLinkedInPosts } from "@/lib/integration";

async function runLinkedInCron() {
  await fetchLinkedInPosts();
}

export async function GET() {
  await runLinkedInCron();
  return NextResponse.json({ ok: true });
}

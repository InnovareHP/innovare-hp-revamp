import { syncPastEvents } from "@/lib/event-cron";

async function runEventCron() {
  return syncPastEvents();
}

export default async function handler() {
  const result = await runEventCron();

  return new Response(
    JSON.stringify({
      ok: true,
      job: "event-status-cron",
      ...result,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export const config = {
  // Runs daily at 12:00 AM UTC.
  schedule: "0 0 * * *",
};

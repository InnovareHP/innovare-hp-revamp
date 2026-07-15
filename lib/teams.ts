const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const TOKEN_URL = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AZURE_CLIENT_ID!,
      client_secret: process.env.AZURE_CLIENT_SECRET!,
      scope: "https://graph.microsoft.com/.default",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get Teams access token: ${err}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export type TeamsMeeting = {
  meetingId: string;
  joinUrl: string;
};

export async function createTeamsMeeting(event: {
  title: string;
  startDate: Date;
  endDate?: Date | null;
}): Promise<TeamsMeeting> {
  const token = await getAccessToken();
  const userId = process.env.AZURE_ORGANIZER_USER_ID!;

  const endDate =
    event.endDate ?? new Date(event.startDate.getTime() + 60 * 60 * 1000); // default +1hr

  const res = await fetch(`${GRAPH_BASE}/users/${userId}/onlineMeetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: event.title,
      startDateTime: event.startDate.toISOString(),
      endDateTime: endDate.toISOString(),
      lobbyBypassSettings: {
        scope: "organizer", // Everyone waits in lobby — organizer admits
        isDialInBypassEnabled: false,
      },
      allowedPresenters: "organizer",
      joinMeetingIdSettings: {
        isPasscodeRequired: false,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create Teams meeting: ${err}`);
  }

  const meeting = await res.json();
  return {
    meetingId: meeting.id as string,
    joinUrl: meeting.joinWebUrl as string,
  };
}

export async function updateTeamsMeeting(
  meetingId: string,
  event: {
    title: string;
    startDate: Date;
    endDate?: Date | null;
  }
): Promise<void> {
  const token = await getAccessToken();
  const userId = process.env.AZURE_ORGANIZER_USER_ID!;

  const endDate =
    event.endDate ?? new Date(event.startDate.getTime() + 60 * 60 * 1000);

  const res = await fetch(
    `${GRAPH_BASE}/users/${userId}/onlineMeetings/${meetingId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: event.title,
        startDateTime: event.startDate.toISOString(),
        endDateTime: endDate.toISOString(),
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update Teams meeting: ${err}`);
  }
}

export async function deleteTeamsMeeting(meetingId: string): Promise<void> {
  const token = await getAccessToken();
  const userId = process.env.AZURE_ORGANIZER_USER_ID!;

  const res = await fetch(
    `${GRAPH_BASE}/users/${userId}/onlineMeetings/${meetingId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // 404 is fine — meeting may already be gone
  if (!res.ok && res.status !== 404) {
    const err = await res.text();
    throw new Error(`Failed to delete Teams meeting: ${err}`);
  }
}

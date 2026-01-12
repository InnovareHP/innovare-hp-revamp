import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Better Auth will look for BETTER_AUTH_URL in your .env
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

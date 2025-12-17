import { JWT } from "google-auth-library";

export const auth = new JWT({
  email: process.env.GSC_CLIENT_EMAIL,
  key: process.env.GSC_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});

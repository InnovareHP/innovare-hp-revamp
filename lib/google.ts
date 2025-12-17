import { JWT } from "google-auth-library";

const base64EncodedServiceAccount = process.env.GSC_PRIVATE_KEY;
if (!base64EncodedServiceAccount) {
  throw new Error("GSC_PRIVATE_KEY is not set");
}
const decodedServiceAccount = Buffer.from(
  base64EncodedServiceAccount,
  "base64"
).toString("utf-8");
const credentials = JSON.parse(decodedServiceAccount);

export const auth = new JWT({
  email: process.env.GSC_CLIENT_EMAIL,
  key: credentials,
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});

import { auth } from "@/lib/auth"; // Ensure you created this in Step 1
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);

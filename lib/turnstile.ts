import crypto from "crypto";

const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY!;

export async function validateWithRetry(
  token: string,
  remoteip?: string,
  maxRetries = 3
) {
  const idempotencyKey = crypto.randomUUID();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const formData = new FormData();
      formData.append("secret", SECRET_KEY);
      formData.append("response", token);

      if (remoteip) {
        formData.append("remoteip", remoteip);
      }

      formData.append("idempotency_key", idempotencyKey);

      const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        return result;
      }

      if (attempt === maxRetries) {
        return result;
      }

      // exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    } catch {
      if (attempt === maxRetries) {
        return { success: false, "error-codes": ["internal-error"] };
      }
    }
  }
}

"use server";

import { spamKeywords } from "@/lib/const";
import { GetInTouch } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { ContactFormValues } from "@/lib/schema";
import { validateWithRetry } from "@/lib/turnstile";
import { render } from "@react-email/render";
import { headers } from "next/headers";

export const createGetInTouch = async (
  formData: ContactFormValues & { turnstileToken: string }
) => {
  const {
    name,
    phoneNumber,
    email,
    websiteOrSocial,
    preferredContact,
    message,
    companyWebsite,
    turnstileToken,
  } = formData;

  const content = `${message}`.toLowerCase();
  const isSpam = spamKeywords.some((keyword) => content.includes(keyword));
  if (!turnstileToken || companyWebsite || isSpam) {
    return { success: false };
  }

  const headersList = await headers();
  const ip =
    headersList.get("cf-connecting-ip") ??
    headersList.get("x-forwarded-for")?.split(",")[0] ??
    undefined;

  // 🛡️ Verify Turnstile
  const verification = await validateWithRetry(turnstileToken, ip);

  if (!verification?.success) {
    console.error("Turnstile failed:", verification);
    return { success: false };
  }

  await resend.emails.send({
    from: "Innovare HP <hello@innovarehp.com>",
    to: ["hello@innovarehp.com", "info@innovarehp.com"],
    subject: "New Contact Form Submission",
    html: await render(
      GetInTouch({
        FullName: name,
        PhoneNumber: phoneNumber,
        Email: email,
        OnlinePresence: websiteOrSocial || "",
        ContactMethod: preferredContact,
        Message: message,
      })
    ),
  });

  await prisma.contactFormSubmission.create({
    data: {
      name,
      email,
      message,
    },
  });

  return { success: true };
};

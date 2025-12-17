"use server";

import { GetInTouch } from "@/lib/email";
import { resend } from "@/lib/resend";
import { ContactFormValues } from "@/lib/schema";
import { render } from "@react-email/render";

export const createGetInTouch = async (formData: ContactFormValues) => {
  const {
    name,
    phoneNumber,
    email,
    websiteOrSocial,
    preferredContact,
    message,
  } = formData;

  await resend.emails.send({
    from: "Innovare HP <hello@innovarehp.com>",
    to: "hello@innovarehp.com",
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

  return { success: true };
};

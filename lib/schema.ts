// src/schema/contactSchema.ts or defined in the component file

import * as z from "zod";

// Define the valid options for the contact method
const ContactMethod = z.enum(["Email", "Text", "Phone Call"], {
  error: "Please select a preferred contact method.",
});

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, {
      message: "Invalid phone number format.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  websiteOrSocial: z.string().optional(), // The "Where can we find you online?" field is optional.
  preferredContact: ContactMethod,
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});

// Infer the TypeScript type
export type ContactFormValues = z.infer<typeof contactFormSchema>;

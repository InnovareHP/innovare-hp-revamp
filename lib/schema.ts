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
  companyWebsite: z.string().optional(),
});

// Infer the TypeScript type
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

// lib/schema.ts
export const eventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date({ message: "A date is required" }).nullable(),
  location: z.string().min(2, "Location is required"),
  status: z.string().min(1, "Status is required"),
  eventStartDate: z.date({ message: "Start date is required" }).nullable(),
  maxGuests: z.number().int().min(1, "Must have at least 1 guest"),
  media: z.instanceof(File).optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;

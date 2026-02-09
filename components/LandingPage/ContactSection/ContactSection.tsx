"use client";

import { createGetInTouch } from "@/app/action/email.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContactFormValues } from "@/lib/schema";
import { contactFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Turnstile, { useTurnstile } from "react-turnstile";
import { toast } from "sonner";

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  phoneNumber: "",
  email: "",
  websiteOrSocial: "",
  preferredContact: "Email",
  message: "",
};

/* Use transform-only animation so content is never "visually hidden" (opacity 0) and exposed to AT */
const containerVariants: Variants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 10 },
  visible: { y: 0 },
};

const TURNSTILE_IFRAME_TITLE = "Security verification to confirm you are human (Cloudflare Turnstile)";

export default function ContactSection() {
  const turnstile = useTurnstile();
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const labelTurnstileIframe = () => {
    const setTitle = () => {
      const iframe = turnstileContainerRef.current?.querySelector("iframe");
      if (iframe && !iframe.getAttribute("title")) {
        iframe.setAttribute("title", TURNSTILE_IFRAME_TITLE);
      }
    };
    setTitle();
    // Fallback: iframe may be injected shortly after onLoad (audit-friendly)
    setTimeout(setTitle, 100);
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: ContactFormValues) => {
    const announcement = document.getElementById("form-announcement");
    
    if (!turnstileToken) {
      toast.error("Please verify you are human.");
      if (announcement) {
        announcement.textContent = "Error: Please verify you are human by completing the security verification.";
      }
      return;
    }

    if (announcement) {
      announcement.textContent = "Submitting form...";
    }

    const res = await createGetInTouch({
      ...values,
      turnstileToken,
    });

    if (!res.success) {
      toast.error("Verification failed. Please try again.");
      turnstile.reset(); // 🔥 important
      setTurnstileToken(null);
      if (announcement) {
        announcement.textContent = "Error: Verification failed. Please try again.";
      }
      return;
    }

    toast.success("Message sent successfully!");
    form.reset(defaultValues);
    turnstile.reset();
    setTurnstileToken(null);
    if (announcement) {
      announcement.textContent = "Success: Your message has been sent successfully!";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="p-8 bg-white rounded-lg border shadow-sm"
      aria-label="Contact form"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4">
        Stay in touch!
      </motion.h2>

      {/* Screen reader announcements for form status */}
      <div
        id="form-announcement"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6" 
          noValidate
        >
          {/* NAME */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} required aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* PHONE */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input {...field} required aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* EMAIL */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input {...field} required aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* MESSAGE */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[120px]" {...field} required aria-required="true" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <FormField
            control={form.control}
            name="companyWebsite"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel className="sr-only">Company Website (leave blank)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-label="Company Website (leave blank)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TURNSTILE */}
          <motion.div variants={itemVariants}>
            <fieldset className="border-0 p-0 m-0 min-w-0">
              <legend id="security-verification-legend" className="sr-only">
                Security verification
              </legend>
              <Turnstile
                userRef={turnstileContainerRef as React.MutableRefObject<HTMLDivElement>}
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                theme="light"
                size="flexible"
                onLoad={labelTurnstileIframe}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => {
                  toast.error("Turnstile error");
                  setTurnstileToken(null);
                }}
              />
            </fieldset>
          </motion.div>

          {/* SUBMIT */}
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !turnstileToken}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}

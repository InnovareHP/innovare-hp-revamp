"use client";

import { createGetInTouch } from "@/app/action/email.action";
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

const TURNSTILE_IFRAME_TITLE =
  "Security verification to confirm you are human (Cloudflare Turnstile)";

const fieldClass =
  "h-9 rounded-md border-hairline bg-white px-3 py-1 text-sm text-ink shadow-none focus-visible:border-brand focus-visible:ring-brand/30";

const labelClass = "text-base font-medium text-ink";

type ContactSectionProps = {
  selectedOfficeLabel?: string;
};

export default function ContactSection({
  selectedOfficeLabel,
}: ContactSectionProps = {}) {
  const turnstile = useTurnstile();
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const labelTurnstileIframe = () => {
    const setTitle = () => {
      const iframe = turnstileContainerRef.current?.querySelector("iframe");
      if (iframe) {
        if (!iframe.getAttribute("title")) {
          iframe.setAttribute("title", TURNSTILE_IFRAME_TITLE);
        }
        if (!iframe.getAttribute("aria-label")) {
          iframe.setAttribute("aria-label", TURNSTILE_IFRAME_TITLE);
        }
      }
    };
    setTitle();
    // The iframe can be injected shortly after onLoad fires.
    setTimeout(setTitle, 100);
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const announce = (message: string, clearAfter?: number) => {
    const announcement = document.getElementById("form-announcement");
    if (!announcement) return;
    announcement.setAttribute("aria-hidden", "false");
    announcement.textContent = message;
    if (clearAfter) {
      setTimeout(() => {
        announcement.setAttribute("aria-hidden", "true");
        announcement.textContent = "";
      }, clearAfter);
    }
  };

  const onSubmit = async (values: ContactFormValues) => {
    if (!turnstileToken) {
      toast.error("Please verify you are human.");
      announce(
        "Error: Please verify you are human by completing the security verification.",
        5000
      );
      return;
    }

    announce("Submitting form...");

    const messageWithOffice = selectedOfficeLabel
      ? `[Regarding: ${selectedOfficeLabel}]\n\n${values.message}`
      : values.message;

    const res = await createGetInTouch({
      ...values,
      message: messageWithOffice,
      turnstileToken,
    });

    if (!res.success) {
      toast.error("Verification failed. Please try again.");
      turnstile.reset();
      setTurnstileToken(null);
      announce("Error: Verification failed. Please try again.", 5000);
      return;
    }

    toast.success("Message sent successfully!");
    form.reset(defaultValues);
    turnstile.reset();
    setTurnstileToken(null);
    announce("Success: Your message has been sent successfully!", 3000);
  };

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] sm:p-9">
      <h3 className="text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold text-brand">
        Start a conversation
      </h3>

      {selectedOfficeLabel && (
        <p className="mt-2 text-sm text-ink">
          Your message will be routed to our{" "}
          <span className="font-semibold text-brand">
            {selectedOfficeLabel}
          </span>{" "}
          team.
        </p>
      )}

      {/* Screen reader announcements: hidden from AT until we set content. */}
      <div
        id="form-announcement"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        aria-hidden="true"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-3">
                <FormLabel className={labelClass}>
                  Full Name <span className="text-[#ff0200]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    aria-required="true"
                    type="text"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="gap-3">
                <FormLabel className={labelClass}>
                  Phone <span className="text-[#ff0200]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    aria-required="true"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-3">
                <FormLabel className={labelClass}>
                  Email <span className="text-[#ff0200]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    aria-required="true"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="gap-3">
                <FormLabel className={labelClass}>
                  Message <span className="text-[#ff0200]">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    required
                    aria-required="true"
                    className={`${fieldClass} h-[102px] min-h-[102px] py-2`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot: inert + hidden so the subtree stays out of the a11y tree. */}
          <div
            className="hidden"
            aria-hidden="true"
            hidden
            inert
            style={{ display: "none" }}
            data-honeypot-wrapper
          >
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem className="hidden" aria-hidden="true">
                  <FormControl aria-hidden="true">
                    <Input
                      {...field}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                      hidden
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <fieldset
            className="m-0 min-w-0 border-0 p-0"
            aria-label="Security verification"
          >
            <legend className="sr-only" aria-hidden="true">
              Security verification
            </legend>
            <Turnstile
              userRef={
                turnstileContainerRef as React.MutableRefObject<HTMLDivElement>
              }
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

          <button
            type="submit"
            disabled={form.formState.isSubmitting || !turnstileToken}
            aria-busy={form.formState.isSubmitting}
            className="inline-flex h-[45px] items-center justify-center rounded-full bg-brand px-8 text-base font-bold text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Form>
    </div>
  );
}

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
import { contactFormSchema, ContactFormValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
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

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  const turnstile = useTurnstile();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (!turnstileToken) {
      toast.error("Please verify you are human.");
      return;
    }

    const res = await createGetInTouch({
      ...values,
      turnstileToken,
    });

    if (!res.success) {
      toast.error("Verification failed. Please try again.");
      turnstile.reset(); // 🔥 important
      setTurnstileToken(null);
      return;
    }

    toast.success("Message sent successfully!");
    form.reset(defaultValues);
    turnstile.reset();
    setTurnstileToken(null);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      className="p-8 bg-white rounded-lg border shadow-sm"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4">
        Stay in touch!
      </motion.h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* NAME */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Textarea className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* TURNSTILE */}
          <motion.div variants={itemVariants}>
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              theme="light"
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => {
                toast.error("Turnstile error");
                setTurnstileToken(null);
              }}
            />
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

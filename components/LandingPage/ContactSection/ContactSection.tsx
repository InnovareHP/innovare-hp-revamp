// src/components/ContactSection.tsx
// This is your original code, adapted for use as the right panel.

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
// Assuming you have defined contactFormSchema and ContactFormValues in "@/lib/schema"
import { createGetInTouch } from "@/app/action/email.action";
import { contactFormSchema, ContactFormValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  phoneNumber: "",
  email: "",
  websiteOrSocial: "",
  message: "",
};

const ContactSection = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const response = await createGetInTouch(values);
      if (response.success) {
        toast.success("Message sent successfully");
        form.reset(defaultValues);
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg lg:shadow-lg border">
      <h2 className="text-2xl font-bold mb-2">Stay in touch!</h2>
      <p className="text-sm text-muted-foreground mb-6">
        We&apos;d love to keep the conversation going! Please share your contact
        details so we can stay connected and keep you updated with the latest
        news and happenings.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What&apos;s your name? *</FormLabel>
                <FormDescription>
                  Your full name, nickname, or however you&apos;d like us to
                  address you!
                </FormDescription>
                <FormControl>
                  <Input placeholder="Your answer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number: *</FormLabel>
                <FormDescription>
                  Handy for quick updates or a friendly chat!
                </FormDescription>
                <FormControl>
                  <Input placeholder="Your answer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Best email to reach you at: *</FormLabel>
                <FormDescription>
                  We promise, no spam—just the good stuff!
                </FormDescription>
                <FormControl>
                  <Input placeholder="Your answer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteOrSocial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where can we find you online?</FormLabel>
                <FormDescription>
                  Feel free to drop your social media handles or website link!
                </FormDescription>
                <FormControl>
                  <Input placeholder="Your answer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Preferred method of contact: *</FormLabel>
                <FormDescription>
                  Do you prefer emails, texts, or maybe a good old-fashioned
                  phone call?
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.join(", ")}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Email" />
                      </FormControl>
                      <FormLabel className="font-normal">Email</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Text" />
                      </FormControl>
                      <FormLabel className="font-normal">Text</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Phone Call" />
                      </FormControl>
                      <FormLabel className="font-normal">Phone Call</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message: *</FormLabel>
                <FormDescription>
                  We&apos;re all ears! If you have any questions, comments, or
                  just want to say hello, this is the perfect place to do it.
                  Let us know what&apos;s on your mind, and we&apos;ll get back
                  to you as soon as we can!
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    className="resize-y min-h-[120px]" // Adjusted height for better flow
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center pt-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => form.reset(defaultValues)} // Reset to clear form
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactSection;

"use client";

import { createGetInTouch } from "@/app/action/email.action";
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
import { contactFormSchema, ContactFormValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, Variants } from "framer-motion"; // Added motion and Variants
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  phoneNumber: "",
  email: "",
  websiteOrSocial: "",
  message: "",
};

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
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
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="p-8 bg-white rounded-lg lg:shadow-lg border"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">
        Stay in touch!
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-sm text-muted-foreground mb-6"
      >
        We&apos;d love to keep the conversation going! Please share your contact
        details so we can stay connected and keep you updated with the latest
        news and happenings.
      </motion.p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
                      defaultValue={field.value}
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
                        <FormLabel className="font-normal">
                          Phone Call
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message: *</FormLabel>
                  <FormDescription>
                    We&apos;re all ears! If you have any questions, comments, or
                    just want to say hello, this is the perfect place to do it.
                    Let us know what&apos;s on your mind, and we&apos;ll get
                    back to you as soon as we can!
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center pt-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </motion.div>
            <Button
              type="button"
              variant="link"
              onClick={() => form.reset(defaultValues)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear form
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactSection;

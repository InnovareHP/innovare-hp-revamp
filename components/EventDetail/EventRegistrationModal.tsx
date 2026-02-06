"use client";

import { joinEvent } from "@/app/events/action/eventaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { storeEventRegistration } from "@/lib/event-registration-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Turnstile, { useTurnstile } from "react-turnstile";
import { toast } from "sonner";
import * as z from "zod";

const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      "Phone number can only contain digits, spaces, and symbols like +, -, (, )"
    ),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface EventRegistrationModalProps {
  eventId: string;
  eventTitle: string;
  isPastDeadline: boolean;
  onSuccess?: () => void;
}

const EventRegistrationModal = ({
  eventId,
  eventTitle,
  isPastDeadline,
  onSuccess,
}: EventRegistrationModalProps) => {
  const turnstile = useTurnstile();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    if (!turnstileToken) {
      toast.error("Please verify you are human.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await joinEvent(eventId, data, turnstileToken);

      if (response.success) {
        // Store registration in localStorage
        storeEventRegistration(eventId, data.email, data.name);

        toast.success("Successfully registered for the event!", {
          description: "You will receive a confirmation email shortly.",
        });

        // Update local state
        setIsAlreadyRegistered(true);
        setRegistrationDetails({
          name: data.name,
          email: data.email,
        });

        form.reset();
        onSuccess?.();
      } else {
        toast.error(response.error || "Failed to register for event", {
          description: "Please try again or contact support.",
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isPastDeadline;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full sm:w-auto min-w-[200px] bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          disabled={isDisabled}
        >
          {isAlreadyRegistered ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Already Registered
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 mr-2" />
              {isPastDeadline ? "Registration Closed" : "Register Now"}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {isAlreadyRegistered ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Already Registered
              </DialogTitle>
              <DialogDescription>
                You are already registered for <strong>{eventTitle}</strong>.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-green-900">
                Registration Details:
              </p>
              <div className="text-sm text-green-800 space-y-1">
                <p>
                  <strong>Name:</strong> {registrationDetails?.name}
                </p>
                <p>
                  <strong>Email:</strong> {registrationDetails?.email}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Register for Event</DialogTitle>
              <DialogDescription>
                Complete the form below to register for{" "}
                <strong>{eventTitle}</strong>. All fields are required.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          disabled={isSubmitting}
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
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  theme="light"
                  size="flexible"
                  onVerify={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => {
                    toast.error("Turnstile error");
                    setTurnstileToken(null);
                  }}
                />

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      form.reset();
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;

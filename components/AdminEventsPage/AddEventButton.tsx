"use client";

import { createEvent } from "@/app/admin/events/action";
import { updateEvent } from "@/app/events/action/eventaction";
import { EventFormValues, eventSchema } from "@/lib/schema";
import { uploadFile } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventStatus } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import MediaUploadDropper from "../ui/MediaFileUploadDrop";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type Props = {
  type?: "add" | "edit";
  event?: EventFormValues & { id: string };
};

const AddEventButton = ({ type = "add", event }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          location: event.location,
          status: event.status.toLowerCase() as EventStatus,
          maxGuests: event.maxGuests,
          date: event.date ?? null,
          eventStartDate: event.eventStartDate ?? null,
          media: event?.media,
        }
      : {
          title: "",
          description: "",
          location: "",
          status: EventStatus.DRAFT,
          maxGuests: 1,
          date: null,
          eventStartDate: null,
          media: undefined,
        },
  });

  async function onSubmit(values: EventFormValues) {
    try {
      let mediaUrl: string | undefined;

      if (values.media instanceof File) {
        const media = await uploadFile(values.media);
        mediaUrl = media.url;
      }

      if (type === "add") {
        await createEvent({
          title: values.title,
          description: values.description,
          location: values.location,
          status: values.status.toUpperCase() as EventStatus,
          maxGuests: values.maxGuests,
          eventStartDate: values.eventStartDate ?? new Date(),
          media: mediaUrl
            ? {
                create: {
                  url: mediaUrl,
                  type: values.media?.type ?? "",
                },
              }
            : undefined,
        });

        toast.success("Event created successfully!");
      } else {
        await updateEvent(event!.id, {
          id: event!.id,
          title: values.title,
          description: values.description,
          location: values.location,
          status: values.status.toUpperCase() as EventStatus,
          maxGuests: values.maxGuests,
          eventStartDate: values.eventStartDate ?? new Date(),
          media: mediaUrl
            ? {
                upsert: {
                  create: { url: mediaUrl, type: values.media?.type ?? "" },
                  update: { url: mediaUrl },
                },
              }
            : undefined,
        });

        toast.success("Event updated successfully!");
      }

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          {type === "add" && <Plus className="mr-2 h-4 w-4" />}
          {type === "add" ? "Add Event" : "Edit Event"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? "Create Event" : "Edit Event"}
          </DialogTitle>
          <DialogDescription>
            {type === "add"
              ? "Fill in the details to create a new event."
              : "Fill in the details to edit the event."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Event Title"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Event description"
                      {...field}
                      value={field.value ?? ""}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DATE */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EVENT START DATE */}
              <FormField
                control={form.control}
                name="eventStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Event Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LOCATION */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Event Location"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* STATUS */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* MAX GUESTS */}
            <FormField
              control={form.control}
              name="maxGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Maximum number of guests"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media</FormLabel>
                  <FormControl>
                    <MediaUploadDropper
                      value={field.value}
                      onChange={field.onChange}
                      onUpload={async (file) => {
                        const media = await uploadFile(file);
                        return media.url;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? type === "add"
                    ? "Creating..."
                    : "Updating..."
                  : type === "add"
                    ? "Create Event"
                    : "Update Event"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventButton;

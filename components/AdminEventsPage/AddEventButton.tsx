"use client";

import { createEvent } from "@/app/admin/events/action";
import { updateEvent } from "@/app/events/action/eventaction";
import { EventFormValues, eventSchema } from "@/lib/schema";
import { uploadFile } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventStatus, EventType } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
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
  event?: EventFormValues & { id: string | null; expectations: string[] };
};

const AddEventButton = ({ type = "add", event }: Props) => {
  const [open, setOpen] = useState(false);
  const [showMedia, setShowMedia] = useState(!!event?.media);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as Resolver<EventFormValues>,
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          location: event.location,
          status: event.status.toLowerCase() as EventStatus,
          eventType: (event.eventType as EventType) ?? EventType.ONSITE,
          hostedBy: event.hostedBy ?? "",
          expectations: event.expectations ?? [],
          eventStartDate: event.eventStartDate ?? null,
          eventStartTime: event.eventStartDate
            ? format(new Date(event.eventStartDate), "HH:mm")
            : "",
          eventEndDate: event.eventEndDate ?? null,
          isPaid: event.isPaid ?? false,
          price: Number(event.price) ?? 0,
          currency: event.currency ?? "USD",
          media: event?.media,
        }
      : {
          title: "",
          description: "",
          location: "",
          status: EventStatus.DRAFT,
          eventType: EventType.ONSITE,
          hostedBy: "",
          expectations: [],
          eventStartDate: null,
          eventStartTime: "",
          eventEndDate: null,
          isPaid: false,
          price: 0,
          currency: "USD",
          media: undefined,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "expectations" as never,
  });

  const isPaid = form.watch("isPaid");

  function mergeDateAndTime(date: Date | null, time: string): Date | null {
    if (!date) return null;
    const d = new Date(date);
    if (time) {
      const [hours, minutes] = time.split(":").map(Number);
      d.setHours(hours, minutes, 0, 0);
    }
    return d;
  }

  async function onSubmit(values: EventFormValues) {
    try {
      let mediaUrl: string | undefined;

      if (values.media instanceof File) {
        const media = await uploadFile(values.media);
        mediaUrl = media.url;
      }
      const startDate = mergeDateAndTime(
        values.eventStartDate,
        values.eventStartTime ?? ""
      );

      const endDate = values.eventEndDate
        ? new Date(values.eventEndDate)
        : null;

      const validExpectations = (values.expectations ?? []).filter((e) =>
        e.trim()
      );

      if (type === "add") {
        await createEvent({
          title: values.title,
          slug: values.title.toLowerCase().replace(/ /g, "-"),
          description: values.description,
          location: values.location,
          status: values.status.toUpperCase() as EventStatus,
          eventType: (values.eventType ?? "ONSITE") as EventType,
          hostedBy: values.hostedBy || null,
          eventStartDate: startDate ?? new Date(),
          eventEndDate: endDate ? new Date(endDate) : undefined,
          isPaid: values.isPaid ?? false,
          price: values.isPaid && values.price ? values.price : 0,
          currency: values.currency ?? "USD",
          expectations:
            validExpectations.length > 0
              ? {
                  create: validExpectations.map((e) => ({ description: e })),
                }
              : undefined,
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
        // TypeScript fix: event!.id is assumed to be string | null, but updateEvent expects string
        if (!event?.id) {
          throw new Error("Invalid event ID for update");
        }
        await updateEvent(event.id, {
          id: event.id,
          title: values.title,
          slug: values.title.toLowerCase().replace(/ /g, "-"),
          description: values.description,
          location: values.location,
          status: values.status.toUpperCase() as EventStatus,
          eventType: (values.eventType ?? "ONSITE") as EventType,
          hostedBy: values.hostedBy || null,
          eventStartDate: startDate ? new Date(startDate) : undefined,
          eventEndDate: endDate ? new Date(endDate) : undefined,
          isPaid: values.isPaid ?? false,
          price: values.isPaid && values.price ? values.price : 0,
          currency: values.currency ?? "USD",
          expectations: {
            deleteMany: {
              eventId: event!.id,
            },
            create: validExpectations.map((e) => ({ description: e })),
          },
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
      toast.error("Failed to save event.");
      console.error("Error saving event:", error);
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

            {/* HOSTED BY */}
            <FormField
              control={form.control}
              name="hostedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hosted By</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Dr. Jane Smith"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WHAT TO EXPECT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel>What to Expect</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append("")}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Item
                </Button>
              </div>
              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No expectations added yet.
                </p>
              )}
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FormField
                    control={form.control}
                    name={`expectations.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder={`Expectation ${index + 1}`}
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* EVENT START DATE + TIME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <FormField
                control={form.control}
                name="eventStartTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* EVENT END DATE */}
            <FormField
              control={form.control}
              name="eventEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event End Date</FormLabel>
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
                            <span>Pick an end date</span>
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
                        disabled={(date) => {
                          const startDate = form.getValues("eventStartDate");
                          return startDate
                            ? date < new Date(startDate)
                            : date < new Date("1900-01-01");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* EVENT TYPE */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ONSITE">Onsite</SelectItem>
                      <SelectItem value="VIRTUAL">Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PAID EVENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="isPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid Event</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Is this a paid event?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">Free</SelectItem>
                        <SelectItem value="true">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isPaid && (
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="e.g. 25.00"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {!showMedia ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowMedia(true)}
                className="w-full"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Add Media
              </Button>
            ) : (
              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Media</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          field.onChange(null);
                          setShowMedia(false);
                        }}
                        className="text-xs text-muted-foreground"
                      >
                        Remove
                      </Button>
                    </div>
                    <FormControl>
                      <MediaUploadDropper
                        value={field.value ?? undefined}
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
            )}

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

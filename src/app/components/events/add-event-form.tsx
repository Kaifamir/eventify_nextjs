"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const eventTypes = [
  { value: "birthday", label: "Birthday" },
  { value: "wedding", label: "Wedding" },
  { value: "baby-shower", label: "Baby Shower" },
  { value: "anniversary", label: "Anniversary" },
  { value: "graduation", label: "Graduation" },
  { value: "conference", label: "Conference" },
  { value: "meeting", label: "Meeting" },
  { value: "party", label: "Party" },
  { value: "other", label: "Other" },
]

const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  eventType: z.string({
    required_error: "Please select an event type.",
  }),
  customEventType: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      type FormContext = { parent: { eventType: string } };
      const parentCtx = ctx as unknown as FormContext;
      if (parentCtx.parent.eventType === "other" && (!val || val.length < 2)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify the event type."
        });
      }
    }),
  date: z.date().optional(),
  time: z.string().optional(),
  location: z.string().optional(),
})

export type EventFormValues = z.infer<typeof formSchema>

interface AddEventFormProps {
  onSubmit: (values: EventFormValues) => void
  onCancel: () => void
}

export function AddEventForm({ onSubmit, onCancel }: AddEventFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      customEventType: "",
      location: "",
      time: "",
    },
  })

  const watchEventType = form.watch("eventType")

  useEffect(() => {
    if (watchEventType !== "other") {
      form.setValue("customEventType", "")
    }
  }, [watchEventType, form])

  const handleSubmit = (values: EventFormValues) => {
    const processedValues = {
      ...values,
      displayEventType:
        values.eventType === "other"
          ? values.customEventType
          : eventTypes.find((type) => type.value === values.eventType)?.label || values.eventType,
    }
    onSubmit(processedValues)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Event Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Sarah's Birthday"
                  {...field}
                  className="bg-[#2c2c2e] border-0 focus-visible:ring-1 focus-visible:ring-white/20 h-12 rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#2c2c2e] border-0 focus:ring-1 focus:ring-white/20 h-12 rounded-xl">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#2c2c2e] border border-[#1d1d1f]">
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs text-zinc-400">
                Select the type of event you&apos;re planning.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchEventType === "other" && (
          <FormField
            control={form.control}
            name="customEventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white">Specify Event Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Housewarming, Reunion"
                    {...field}
                    className="bg-[#2c2c2e] border-0 focus-visible:ring-1 focus-visible:ring-white/20 h-12 rounded-xl"
                  />
                </FormControl>
                <FormDescription className="text-xs text-zinc-400">
                  Please specify what type of event you&apos;re planning.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium text-white">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal bg-[#2c2c2e] border-0 focus:ring-1 focus:ring-white/20 h-12 rounded-xl",
                          !field.value && "text-zinc-400",
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#2c2c2e] border border-[#1d1d1f]" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="bg-[#2c2c2e] text-white [&_.rdp-day]:text-white [&_.rdp-nav_button]:text-white [&_.rdp-caption_label]:text-white"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs text-zinc-400">Can be configured later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-white">Time</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      type="time"
                      placeholder="17:00"
                      {...field}
                      className="bg-[#2c2c2e] border-0 focus-visible:ring-1 focus-visible:ring-white/20 h-12 rounded-xl"
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-zinc-400">Can be configured later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="e.g. London"
                    {...field}
                    className="bg-[#2c2c2e] border-0 focus-visible:ring-1 focus-visible:ring-white/20 h-12 rounded-xl pl-10"
                  />
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-white/60" />
                </div>
              </FormControl>
              <FormDescription className="text-xs text-zinc-400">Enter a city or specific address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} className="font-light">
            Cancel
          </Button>
          <Button type="submit" className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-6">
            Create Event
          </Button>
        </div>
      </form>
    </Form>
  )
} 
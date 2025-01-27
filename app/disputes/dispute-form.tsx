"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const disputeFormSchema = z.object({
  requestId: z.string().min(1, "Request ID is required"),
  type: z.string().min(1, "Dispute type is required"),
  title: z.string().min(4, "Title must be at least 4 characters"),
  description: z.string().min(100, "Please provide a detailed description (min 100 characters)"),
  evidence: z.string().url("Please provide a valid URL to evidence").optional(),
})

type DisputeFormValues = z.infer<typeof disputeFormSchema>

export function DisputeForm() {
  const { toast } = useToast()

  const form = useForm<DisputeFormValues>({
    resolver: zodResolver(disputeFormSchema),
    defaultValues: {
      requestId: "",
      type: "",
      title: "",
      description: "",
      evidence: "",
    },
  })

  async function onSubmit(data: DisputeFormValues) {
    try {
      // Here we would submit the dispute to the smart contract
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Dispute submitted",
        description: "Your dispute has been submitted successfully.",
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your dispute.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="requestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter the fund request ID" {...field} />
              </FormControl>
              <FormDescription>The ID of the fund request this dispute is about</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dispute Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dispute type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="misuse">Fund Misuse</SelectItem>
                  <SelectItem value="fraud">Fraudulent Request</SelectItem>
                  <SelectItem value="violation">Terms Violation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the type of dispute you are filing</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Brief title for your dispute" {...field} />
              </FormControl>
              <FormDescription>A clear and concise title for your dispute</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide detailed information about your dispute"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Explain the nature of your dispute in detail</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="evidence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evidence URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/evidence" type="url" {...field} />
              </FormControl>
              <FormDescription>Optional: Link to any supporting evidence (documents, images, etc.)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Dispute
        </Button>
      </form>
    </Form>
  )
}


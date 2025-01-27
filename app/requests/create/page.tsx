"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createFundRequest } from "@/lib/contracts"
import { useRouter } from "next/navigation"

const requestFormSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  amount: z.number().min(50, "Minimum request amount is $50"),
  description: z.string().min(100, "Please provide a detailed description (min 100 characters)"),
  duration: z.number().min(1, "Duration must be at least 1 day").max(30, "Duration cannot exceed 30 days"),
})

type RequestFormValues = z.infer<typeof requestFormSchema>

export default function CreateRequestPage() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      title: "",
      amount: 50,
      description: "",
      duration: 7,
    },
  })

  async function onSubmit(data: RequestFormValues) {
    try {
      const tx = await createFundRequest(data.amount, data.description, data.duration)
      toast({
        title: "Request created",
        description: "Your fund request has been created successfully.",
      })
      router.push("/requests")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your request.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Fund Request</h1>
        <p className="text-muted-foreground mt-2">Submit a new request for community support</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Provide detailed information about your funding request</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Request title" {...field} />
                    </FormControl>
                    <FormDescription>A clear and concise title for your request</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={50}
                        placeholder="Amount needed"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Minimum request amount is $50</FormDescription>
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
                        placeholder="Provide a detailed description of your request"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Explain why you need the funds and how they will be used</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={30}
                        placeholder="Voting duration"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>How long should the voting period last? (1-30 days)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}


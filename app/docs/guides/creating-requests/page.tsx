import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Steps, StepItem } from "@/components/ui/steps"
import { Info } from "lucide-react"

export default function CreatingRequestsGuidePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Creating Fund Requests</h1>
        <p className="text-muted-foreground mt-2">Learn how to create and manage fund requests on CrowdCare</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Before You Start</AlertTitle>
        <AlertDescription>
          Make sure you have:
          <ul className="list-disc list-inside mt-2">
            <li>Connected your wallet</li>
            <li>Enough ETH for gas fees</li>
            <li>Waited at least 365 days since your last request</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Step-by-Step Guide</h2>

        <Steps>
          <StepItem
            title="Connect Your Wallet"
            description="Click the 'Connect Wallet' button in the navigation bar and select your wallet provider."
          />
          <StepItem
            title="Navigate to Requests"
            description="Go to the 'Fund Requests' page and click 'Create New Request'."
          />
          <StepItem
            title="Fill Request Details"
            description="Provide a title, description, and the amount needed. Be specific about how the funds will be used."
          />
          <StepItem
            title="Submit for Review"
            description="Review your request details and submit. Your request will enter the voting phase."
          />
        </Steps>

        <h2 className="text-2xl font-bold mt-8">Best Practices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Writing a Good Description</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Be clear and specific about your needs</li>
                <li>Explain how the funds will be used</li>
                <li>Include relevant background information</li>
                <li>Be honest and transparent</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Setting the Right Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Request only what you need</li>
                <li>Break down the costs</li>
                <li>Consider platform fees</li>
                <li>Account for gas fees</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8">After Submission</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">After submitting your request:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Your request enters a 7-day voting period</li>
              <li>Community members can vote on your request</li>
              <li>You can track voting progress in real-time</li>
              <li>If approved, donations can begin immediately</li>
              <li>You'll receive notifications about donations and updates</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


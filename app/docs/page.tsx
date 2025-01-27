import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-4xl font-bold">CrowdCare Documentation</h1>
        <p className="text-lg text-muted-foreground mt-2">Learn how to use and integrate with the CrowdCare platform</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Getting Started</AlertTitle>
        <AlertDescription>New to CrowdCare? Start with our quick start guide to learn the basics.</AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>For Users</CardTitle>
            <CardDescription>Learn how to use the CrowdCare platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">- Creating and managing fund requests</p>
            <p className="text-sm">- Making donations and tracking progress</p>
            <p className="text-sm">- Participating in community voting</p>
            <p className="text-sm">- Handling disputes and resolutions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Developers</CardTitle>
            <CardDescription>Technical documentation and integration guides</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">- Smart contract integration</p>
            <p className="text-sm">- API reference and examples</p>
            <p className="text-sm">- Security best practices</p>
            <p className="text-sm">- Testing and deployment</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Core Concepts</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Fund Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fund requests are the core of the CrowdCare platform. Users can create requests for financial support,
                which go through a community voting process before being approved for funding.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Community Voting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The voting system ensures fair distribution of funds by allowing community members to participate in
                decision-making. Users with a minimum donation history can vote on fund requests.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The dispute resolution system provides a transparent and fair process for handling concerns about fund
                requests or usage, with community participation in the resolution process.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


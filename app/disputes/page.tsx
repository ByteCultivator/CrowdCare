import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DisputeForm } from "./dispute-form"
import { DisputeList } from "./dispute-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DisputesPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dispute Resolution Center</h1>
        <p className="text-muted-foreground mt-2">Submit and track disputes related to fund requests</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Disputes</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="new">New Dispute</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Disputes</CardTitle>
              <CardDescription>Currently active disputes that need resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <DisputeList status="active" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Disputes</CardTitle>
              <CardDescription>Previously resolved dispute cases</CardDescription>
            </CardHeader>
            <CardContent>
              <DisputeList status="resolved" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Dispute</CardTitle>
              <CardDescription>Provide details about your dispute</CardDescription>
            </CardHeader>
            <CardContent>
              <DisputeForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


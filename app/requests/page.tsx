import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestCard } from "./request-card"

const SAMPLE_REQUESTS = [
  {
    id: 1,
    title: "Medical Emergency Support",
    description:
      "Seeking support for urgent medical treatment. All funds will be used for hospital expenses and medication.",
    amount: 5000,
    raised: 2500,
    status: "active" as const,
    createdBy: "0x1234...5678",
    daysRemaining: 7,
  },
  {
    id: 2,
    title: "Educational Support Fund",
    description:
      "Need help completing my final year of computer science degree. The funds will be used for tuition and study materials.",
    amount: 3000,
    raised: 1500,
    status: "active" as const,
    createdBy: "0x8765...4321",
    daysRemaining: 14,
  },
  {
    id: 3,
    title: "Small Business Recovery",
    description: "Local restaurant affected by recent events needs support to maintain staff and operations.",
    amount: 10000,
    raised: 7500,
    status: "active" as const,
    createdBy: "0x2468...1357",
    daysRemaining: 21,
  },
]

export default function RequestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Fund Requests</h1>
        <p className="text-muted-foreground mt-2">View and create fund requests</p>
      </div>

      <div className="flex justify-end">
        <Button>Create New Request</Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {SAMPLE_REQUESTS.map((request) => (
            <RequestCard key={request.id} {...request} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}


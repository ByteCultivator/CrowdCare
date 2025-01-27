import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { VotingActions } from "./voting-actions"

export default function VotePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Active Votes</h1>
        <p className="text-muted-foreground mt-2">
          Vote on fund requests to help ensure fair distribution of resources
        </p>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Educational Support Fund</CardTitle>
                  <CardDescription>Request by 0x1234...5678</CardDescription>
                </div>
                <Badge>Voting Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Seeking support for completing my final year of computer science degree. The funds will be used for
                    tuition and essential study materials.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount Requested</span>
                    <span>$3,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Votes</span>
                    <div>
                      <span className="text-green-600">Yes: 75%</span>
                      <span className="mx-2">|</span>
                      <span className="text-red-600">No: 25%</span>
                    </div>
                  </div>
                  <Progress value={75} className="bg-red-200">
                    <div className="bg-green-600 h-full transition-all" style={{ width: "75%" }} />
                  </Progress>
                </div>

                <VotingActions requestId={i} />

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Voting ends in 3 days</span>
                  <span>Minimum donation required to vote: $10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


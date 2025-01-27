"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DisputeListProps {
  status: "active" | "resolved"
}

interface Dispute {
  id: string
  title: string
  type: string
  description: string
  requestId: string
  submittedBy: {
    name: string
    image: string
  }
  status: "pending" | "under_review" | "resolved"
  createdAt: string
  resolution?: string
}

const disputes: Dispute[] = [
  {
    id: "1",
    title: "Suspected Fund Misuse",
    type: "misuse",
    description: "The funds were not used as specified in the request...",
    requestId: "REQ-123",
    submittedBy: {
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
    },
    status: "under_review",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Fraudulent Documentation",
    type: "fraud",
    description: "The submitted documents appear to be falsified...",
    requestId: "REQ-456",
    submittedBy: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
    status: "pending",
    createdAt: "2024-01-19T15:30:00Z",
  },
]

export function DisputeList({ status }: DisputeListProps) {
  return (
    <div className="space-y-4">
      {disputes.map((dispute) => (
        <div key={dispute.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{dispute.title}</h3>
                <Badge variant={dispute.status === "resolved" ? "secondary" : "destructive"}>
                  {dispute.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Request ID: {dispute.requestId}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Details</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{dispute.title}</DialogTitle>
                  <DialogDescription>Dispute details and current status</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={dispute.submittedBy.image} />
                      <AvatarFallback>
                        {dispute.submittedBy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Submitted by {dispute.submittedBy.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(dispute.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground">{dispute.description}</p>
                  </div>
                  {dispute.resolution && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Resolution</h4>
                      <p className="text-sm text-muted-foreground">{dispute.resolution}</p>
                    </div>
                  )}
                  {dispute.status !== "resolved" && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Resolution Progress</h4>
                      <Progress
                        value={dispute.status === "pending" ? 33 : dispute.status === "under_review" ? 66 : 100}
                      />
                      <p className="text-xs text-muted-foreground">Estimated resolution time: 3-5 business days</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  )
}


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    user: {
      name: "Sarah Wilson",
      image: "/placeholder.svg?height=32&width=32",
      address: "0x1234...5678",
    },
    type: "donation",
    amount: "$50",
    timestamp: "2 minutes ago",
  },
  {
    user: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=32&width=32",
      address: "0x8765...4321",
    },
    type: "request",
    amount: "$3,000",
    timestamp: "5 minutes ago",
  },
  {
    user: {
      name: "Emily Johnson",
      image: "/placeholder.svg?height=32&width=32",
      address: "0x2468...1357",
    },
    type: "vote",
    timestamp: "10 minutes ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>
              {activity.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.type === "donation" && `Donated ${activity.amount}`}
              {activity.type === "request" && `Requested ${activity.amount}`}
              {activity.type === "vote" && "Voted on a request"}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.timestamp}</div>
        </div>
      ))}
    </div>
  )
}


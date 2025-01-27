import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const donors = [
  {
    name: "Alex Thompson",
    image: "/placeholder.svg?height=32&width=32",
    amount: "$12,345",
    badge: "Gold",
  },
  {
    name: "Maria Garcia",
    image: "/placeholder.svg?height=32&width=32",
    amount: "$8,420",
    badge: "Gold",
  },
  {
    name: "James Wilson",
    image: "/placeholder.svg?height=32&width=32",
    amount: "$5,230",
    badge: "Silver",
  },
  {
    name: "Lisa Chen",
    image: "/placeholder.svg?height=32&width=32",
    amount: "$3,150",
    badge: "Silver",
  },
]

export function TopDonors() {
  return (
    <div className="space-y-8">
      {donors.map((donor, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={donor.image} alt={donor.name} />
            <AvatarFallback>
              {donor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{donor.name}</p>
            <p className="text-sm text-muted-foreground">{donor.amount}</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {donor.badge}
          </Badge>
        </div>
      ))}
    </div>
  )
}


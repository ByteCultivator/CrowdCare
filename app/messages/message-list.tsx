"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  user: {
    name: string
    image: string
  }
  lastMessage: string
  timestamp: string
  unread: boolean
}

const conversations: Conversation[] = [
  {
    id: "1",
    user: {
      name: "Alice Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Thank you for your support!",
    timestamp: "5m ago",
    unread: true,
  },
  {
    id: "2",
    user: {
      name: "Bob Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "How can I help with your request?",
    timestamp: "1h ago",
    unread: false,
  },
  // Add more conversations...
]

export function MessageList() {
  const [selectedId, setSelectedId] = useState<string>()

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className={cn(
              "flex items-start gap-4 w-full p-4 rounded-lg transition-colors",
              "hover:bg-muted text-left",
              selectedId === conversation.id && "bg-muted",
              conversation.unread && "font-medium",
            )}
            onClick={() => setSelectedId(conversation.id)}
          >
            <Avatar>
              <AvatarImage src={conversation.user.image} alt={conversation.user.name} />
              <AvatarFallback>
                {conversation.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{conversation.user.name}</p>
                <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}


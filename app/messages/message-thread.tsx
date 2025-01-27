"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

interface Message {
  id: string
  content: string
  timestamp: string
  sender: {
    id: string
    name: string
    image: string
  }
}

const messages: Message[] = [
  {
    id: "1",
    content: "Hi, I saw your fund request. I would like to help!",
    timestamp: "10:00 AM",
    sender: {
      id: "1",
      name: "Alice Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    content: "Thank you so much! That would be incredibly helpful.",
    timestamp: "10:02 AM",
    sender: {
      id: "2",
      name: "Current User",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  // Add more messages...
]

export function MessageThread() {
  const [newMessage, setNewMessage] = useState("")
  const currentUserId = "2" // This would come from authentication

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Add message to the thread
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.sender.id === currentUserId

            return (
              <div key={message.id} className={`flex items-start gap-2 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.image} alt={message.sender.name} />
                  <AvatarFallback>
                    {message.sender.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col space-y-1 ${isCurrentUser ? "items-end" : ""}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center gap-2"
        >
          <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}


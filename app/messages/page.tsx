import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageList } from "./message-list"
import { MessageThread } from "./message-thread"

export default function MessagesPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <MessageList />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <MessageThread />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


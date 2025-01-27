import { createClient } from "@supabase/supabase-js"
import { toast } from "@/components/ui/use-toast"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export type Notification = {
  id: string
  userId: string
  type: "donation" | "vote" | "request" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export async function subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const notification = payload.new as Notification
        toast({
          title: notification.title,
          description: notification.message,
        })
        callback(notification)
      },
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}


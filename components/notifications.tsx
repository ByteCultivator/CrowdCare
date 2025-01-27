"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { notificationManager } from "@/lib/notifications"
import { useAccount } from "wagmi"

interface Notification {
  id: string
  type: "donation" | "request" | "vote" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { address } = useAccount()
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (address) {
      notificationManager.setUserAddress(address)

      const handleNotification = (notification: Omit<Notification, "id" | "read">) => {
        setNotifications((prev) => [
          {
            ...notification,
            id: Date.now().toString(),
            read: false,
          },
          ...prev,
        ])
      }

      notificationManager.on("notification", handleNotification)

      // Load historical notifications from The Graph
      loadHistoricalNotifications(address)

      return () => {
        notificationManager.removeListener("notification", handleNotification)
      }
    }
  }, [address])

  const loadHistoricalNotifications = async (userAddress: string) => {
    try {
      const query = `
        query GetUserNotifications($address: String!) {
          user(id: $address) {
            donations {
              id
              timestamp
              amount
              request {
                id
                description
              }
            }
            votes {
              id
              timestamp
              request {
                id
                description
              }
            }
          }
        }
      `

      const response = await fetch(process.env.NEXT_PUBLIC_GRAPH_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { address: userAddress },
        }),
      })

      const { data } = await response.json()

      if (data?.user) {
        const historicalNotifications: Notification[] = [
          ...data.user.donations.map((donation: any) => ({
            id: `donation-${donation.id}`,
            type: "donation" as const,
            title: "Donation Made",
            message: `You donated ${donation.amount} to request "${donation.request.description}"`,
            timestamp: new Date(Number.parseInt(donation.timestamp) * 1000).toISOString(),
            read: true,
          })),
          ...data.user.votes.map((vote: any) => ({
            id: `vote-${vote.id}`,
            type: "vote" as const,
            title: "Vote Cast",
            message: `You voted on request "${vote.request.description}"`,
            timestamp: new Date(Number.parseInt(vote.timestamp) * 1000).toISOString(),
            read: true,
          })),
        ]

        setNotifications((prev) => [...prev, ...historicalNotifications])
      }
    } catch (error) {
      console.error("Error loading historical notifications:", error)
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 ${notification.read ? "opacity-60" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


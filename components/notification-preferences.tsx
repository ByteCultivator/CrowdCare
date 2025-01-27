"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { requestNotificationPermission } from "@/lib/notifications/push"
import { Bell, Mail, MessageSquare } from "lucide-react"

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    push: false,
    email: true,
    inApp: true,
    categories: {
      donations: true,
      requests: true,
      votes: true,
      messages: true,
    },
  })

  const [pushSupported, setPushSupported] = useState(false)

  useEffect(() => {
    setPushSupported("Notification" in window)
  }, [])

  const handlePushToggle = async () => {
    if (!preferences.push) {
      const token = await requestNotificationPermission()
      if (token) {
        setPreferences((prev) => ({ ...prev, push: true }))
        toast({
          title: "Push notifications enabled",
          description: "You will now receive push notifications for important updates.",
        })
      } else {
        toast({
          title: "Permission denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        })
      }
    } else {
      setPreferences((prev) => ({ ...prev, push: false }))
    }
  }

  const updatePreference = (
    category: keyof typeof preferences | ["categories", keyof (typeof preferences)["categories"]],
    value: boolean,
  ) => {
    if (Array.isArray(category)) {
      setPreferences((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category[1]]: value,
        },
      }))
    } else {
      setPreferences((prev) => ({
        ...prev,
        [category]: value,
      }))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pushSupported && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Push Notifications</span>
              </div>
              <Switch checked={preferences.push} onCheckedChange={handlePushToggle} />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Notifications</span>
            </div>
            <Switch checked={preferences.email} onCheckedChange={(checked) => updatePreference("email", checked)} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>In-App Notifications</span>
            </div>
            <Switch checked={preferences.inApp} onCheckedChange={(checked) => updatePreference("inApp", checked)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
          <CardDescription>Select which types of notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Donations</span>
            <Switch
              checked={preferences.categories.donations}
              onCheckedChange={(checked) => updatePreference(["categories", "donations"], checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Fund Requests</span>
            <Switch
              checked={preferences.categories.requests}
              onCheckedChange={(checked) => updatePreference(["categories", "requests"], checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Votes</span>
            <Switch
              checked={preferences.categories.votes}
              onCheckedChange={(checked) => updatePreference(["categories", "votes"], checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Messages</span>
            <Switch
              checked={preferences.categories.messages}
              onCheckedChange={(checked) => updatePreference(["categories", "messages"], checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Save Preferences</Button>
    </div>
  )
}


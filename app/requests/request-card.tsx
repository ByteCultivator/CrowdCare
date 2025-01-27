"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ShareButton } from "@/components/share-button"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface RequestCardProps {
  id: number
  title: string
  description: string
  amount: number
  raised: number
  status: "active" | "pending" | "completed"
  createdBy: string
  daysRemaining: number
}

export function RequestCard({
  id,
  title,
  description,
  amount,
  raised: initialRaised,
  status,
  createdBy,
  daysRemaining,
}: RequestCardProps) {
  const [raised, setRaised] = useState(initialRaised)
  const progress = (raised / amount) * 100

  useEffect(() => {
    const channel = supabase
      .channel(`request:${id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "requests",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setRaised(payload.new.raised)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [id])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Requested by {createdBy}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton title={title} description={description} url={`https://crowdcare.app/requests/${id}`} />
            <Badge>{status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                ${raised.toLocaleString()} / ${amount.toLocaleString()}
              </span>
            </div>
            <Progress value={progress} />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">{daysRemaining} days remaining</div>
            <Button>Donate Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


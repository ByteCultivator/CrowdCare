"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type Achievement, checkAchievements } from "@/lib/achievements"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        // In a real app, we'd get the user ID from authentication
        const unlockedAchievements = await checkAchievements("user123")
        setAchievements(unlockedAchievements)
      } catch (error) {
        console.error("Error loading achievements:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [])

  if (loading) {
    return <div>Loading achievements...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{achievement.icon}</span>
                <CardTitle>{achievement.title}</CardTitle>
              </div>
              {achievement.reward && (
                <Badge variant="outline">
                  {achievement.reward.type === "multiplier" && `${achievement.reward.value}x Multiplier`}
                  {achievement.reward.type === "token" && `${achievement.reward.value} Tokens`}
                  {achievement.reward.type === "badge" && achievement.reward.value}
                </Badge>
              )}
            </div>
            <CardDescription>{achievement.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>Completed!</span>
              </div>
              <Progress value={100} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


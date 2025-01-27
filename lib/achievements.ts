export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (stats: UserStats) => boolean
  reward?: {
    type: "badge" | "token" | "multiplier"
    value: string | number
  }
}

export interface UserStats {
  totalDonations: number
  totalAmount: number
  successfulRequests: number
  votesCount: number
  referrals: number
  joinedDate: Date
}

export const achievements: Achievement[] = [
  {
    id: "first_donation",
    title: "First Steps",
    description: "Made your first donation",
    icon: "🎉",
    condition: (stats) => stats.totalDonations >= 1,
    reward: {
      type: "badge",
      value: "Supporter",
    },
  },
  {
    id: "generous_donor",
    title: "Generous Soul",
    description: "Donated over $1,000 in total",
    icon: "💖",
    condition: (stats) => stats.totalAmount >= 1000,
    reward: {
      type: "multiplier",
      value: 1.1,
    },
  },
  {
    id: "active_voter",
    title: "Community Voice",
    description: "Participated in 50 votes",
    icon: "🗳️",
    condition: (stats) => stats.votesCount >= 50,
    reward: {
      type: "token",
      value: "100",
    },
  },
  {
    id: "successful_fundraiser",
    title: "Dream Achiever",
    description: "Successfully completed 3 fund requests",
    icon: "🎯",
    condition: (stats) => stats.successfulRequests >= 3,
    reward: {
      type: "badge",
      value: "Achiever",
    },
  },
  {
    id: "community_builder",
    title: "Community Builder",
    description: "Referred 10 new members",
    icon: "🤝",
    condition: (stats) => stats.referrals >= 10,
    reward: {
      type: "multiplier",
      value: 1.2,
    },
  },
]

export async function checkAchievements(userId: string): Promise<Achievement[]> {
  // Fetch user stats from the database
  const stats: UserStats = await getUserStats(userId)

  // Check which achievements have been unlocked
  return achievements.filter((achievement) => achievement.condition(stats))
}

async function getUserStats(userId: string): Promise<UserStats> {
  // This would fetch the actual stats from your database
  return {
    totalDonations: 5,
    totalAmount: 1200,
    successfulRequests: 2,
    votesCount: 45,
    referrals: 8,
    joinedDate: new Date("2024-01-01"),
  }
}


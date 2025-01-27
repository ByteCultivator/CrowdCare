import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export interface ReferralData {
  id: string
  referrerId: string
  referredId: string
  status: "pending" | "completed"
  reward: number
  createdAt: string
}

export async function createReferralLink(userId: string): Promise<string> {
  const code = generateReferralCode()

  await supabase.from("referral_codes").insert([
    {
      user_id: userId,
      code,
      created_at: new Date().toISOString(),
    },
  ])

  return `${process.env.NEXT_PUBLIC_APP_URL}/ref/${code}`
}

export async function trackReferral(code: string, newUserId: string) {
  const { data: referralCode } = await supabase.from("referral_codes").select("user_id").eq("code", code).single()

  if (!referralCode) return null

  await supabase.from("referrals").insert([
    {
      referrer_id: referralCode.user_id,
      referred_id: newUserId,
      status: "pending",
      created_at: new Date().toISOString(),
    },
  ])

  return referralCode.user_id
}

export async function completeReferral(referralId: string, reward: number) {
  await supabase
    .from("referrals")
    .update({
      status: "completed",
      reward,
      completed_at: new Date().toISOString(),
    })
    .eq("id", referralId)
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}


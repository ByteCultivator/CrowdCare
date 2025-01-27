"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Copy } from "lucide-react"

export function ReferralStats() {
  const { toast } = useToast()
  const referralLink = "https://crowdcare.app/ref/abc123"
  const referralStats = {
    totalReferrals: 12,
    pendingRewards: "$120",
    nextTier: {
      current: 12,
      target: 20,
      reward: "$50",
    },
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Referral Link</label>
        <div className="flex space-x-2">
          <Input value={referralLink} readOnly />
          <Button size="icon" variant="outline" onClick={copyReferralLink}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Total Referrals</span>
          <span className="font-medium">{referralStats.totalReferrals}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Pending Rewards</span>
          <span className="font-medium">{referralStats.pendingRewards}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Next Tier Progress</span>
            <span className="font-medium">
              {referralStats.nextTier.current} / {referralStats.nextTier.target}
            </span>
          </div>
          <Progress value={(referralStats.nextTier.current / referralStats.nextTier.target) * 100} />
          <p className="text-xs text-muted-foreground">
            Refer {referralStats.nextTier.target - referralStats.nextTier.current} more users to earn{" "}
            {referralStats.nextTier.reward}
          </p>
        </div>
      </div>
    </div>
  )
}


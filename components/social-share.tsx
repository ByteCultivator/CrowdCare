"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share, Twitter, Facebook, Linkedin, Send } from "lucide-react"
import { shareToSocial, generateShareableLink, trackShare } from "@/lib/social"

interface SocialShareProps {
  requestId: string
  title: string
  description: string
}

export function SocialShare({ requestId, title, description }: SocialShareProps) {
  const handleShare = async (platform: string) => {
    const url = generateShareableLink(requestId)

    try {
      await shareToSocial(platform, {
        title,
        description,
        url,
        hashtags: ["CrowdCare", "Community", "Support"],
        via: "CrowdCareApp",
      })

      await trackShare(requestId, platform)
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="h-4 w-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="h-4 w-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          <Linkedin className="h-4 w-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("telegram")}>
          <Send className="h-4 w-4 mr-2" />
          Share on Telegram
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


"use client"

import { Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  title: string
  description: string
  url: string
}

export function ShareButton({ title, description, url }: ShareButtonProps) {
  const shareData = {
    title,
    text: description,
    url,
  }

  const handleShare = async (platform: string) => {
    switch (platform) {
      case "native":
        if (navigator.share) {
          try {
            await navigator.share(shareData)
          } catch (err) {
            console.error("Error sharing:", err)
          }
        }
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navigator.share && <DropdownMenuItem onClick={() => handleShare("native")}>Share</DropdownMenuItem>}
        <DropdownMenuItem onClick={() => handleShare("twitter")}>Share on Twitter</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>Share on LinkedIn</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


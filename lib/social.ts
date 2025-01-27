interface ShareOptions {
  title: string
  description: string
  url: string
  hashtags?: string[]
  via?: string
}

export async function shareToSocial(platform: string, options: ShareOptions) {
  const encodedUrl = encodeURIComponent(options.url)
  const encodedTitle = encodeURIComponent(options.title)
  const encodedDescription = encodeURIComponent(options.description)
  const encodedHashtags = options.hashtags?.join(",")

  let shareUrl = ""

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
      if (options.hashtags) {
        shareUrl += `&hashtags=${encodedHashtags}`
      }
      if (options.via) {
        shareUrl += `&via=${options.via}`
      }
      break
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      break
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      break
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
      break
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }

  // Open share dialog
  window.open(shareUrl, "_blank", "width=600,height=400")
}

export function generateShareableLink(requestId: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/requests/${requestId}`
}

export async function trackShare(requestId: string, platform: string) {
  // Track sharing analytics
  try {
    await fetch("/api/analytics/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
        platform,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error("Error tracking share:", error)
  }
}


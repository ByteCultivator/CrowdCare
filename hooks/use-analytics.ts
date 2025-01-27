import { useCallback } from "react"
import { trackEvent, events } from "@/lib/analytics/tracking"

export function useAnalytics() {
  const trackPageView = useCallback((path: string) => {
    trackEvent({
      name: events.PAGE_VIEW,
      properties: {
        path,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
    })
  }, [])

  const trackButtonClick = useCallback((buttonId: string, properties = {}) => {
    trackEvent({
      name: events.BUTTON_CLICK,
      properties: {
        buttonId,
        ...properties,
      },
    })
  }, [])

  const trackDonation = useCallback((status: "started" | "completed" | "failed", properties = {}) => {
    const eventName = {
      started: events.DONATION_STARTED,
      completed: events.DONATION_COMPLETED,
      failed: events.DONATION_FAILED,
    }[status]

    trackEvent({
      name: eventName,
      properties,
    })
  }, [])

  const trackShare = useCallback((platform: string, contentId: string) => {
    trackEvent({
      name: events.SHARE,
      properties: {
        platform,
        contentId,
      },
    })
  }, [])

  return {
    trackPageView,
    trackButtonClick,
    trackDonation,
    trackShare,
  }
}


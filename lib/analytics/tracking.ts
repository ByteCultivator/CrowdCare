import { Analytics } from "@vercel/analytics/react"
import { track } from "@vercel/analytics"
import { getUserId } from "@/lib/auth"

export interface TrackingEvent {
  name: string
  properties?: Record<string, any>
  userId?: string
}

export async function trackEvent({ name, properties = {}, userId }: TrackingEvent) {
  try {
    const user = userId || (await getUserId())

    track(name, {
      ...properties,
      userId: user,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      {children}
    </>
  )
}

// Predefined events
export const events = {
  // User events
  USER_SIGNUP: "user_signup",
  USER_LOGIN: "user_login",
  PROFILE_UPDATE: "profile_update",

  // Request events
  REQUEST_CREATED: "request_created",
  REQUEST_VIEWED: "request_viewed",
  REQUEST_UPDATED: "request_updated",
  REQUEST_DELETED: "request_deleted",

  // Donation events
  DONATION_STARTED: "donation_started",
  DONATION_COMPLETED: "donation_completed",
  DONATION_FAILED: "donation_failed",

  // Voting events
  VOTE_CAST: "vote_cast",

  // Dispute events
  DISPUTE_CREATED: "dispute_created",
  DISPUTE_RESOLVED: "dispute_resolved",

  // Engagement events
  PAGE_VIEW: "page_view",
  BUTTON_CLICK: "button_click",
  EXTERNAL_LINK_CLICK: "external_link_click",
  SHARE: "share",
} as const

// Usage example:
// trackEvent({
//   name: events.DONATION_COMPLETED,
//   properties: {
//     requestId: '123',
//     amount: 100,
//     currency: 'USD',
//   },
// })


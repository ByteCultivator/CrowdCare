import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 // 1 minute
const MAX_REQUESTS = 100 // requests per window

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const key = `rate-limit:${ip}`

  try {
    const [requests, _] = await redis.pipeline().incr(key).expire(key, RATE_LIMIT_WINDOW).exec()

    const remainingRequests = MAX_REQUESTS - (requests as number)
    const response = NextResponse.next()

    response.headers.set("X-RateLimit-Limit", MAX_REQUESTS.toString())
    response.headers.set("X-RateLimit-Remaining", Math.max(0, remainingRequests).toString())

    if (remainingRequests < 0) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": RATE_LIMIT_WINDOW.toString(),
        },
      })
    }

    return response
  } catch (error) {
    console.error("Rate limiting error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: "/api/:path*",
}


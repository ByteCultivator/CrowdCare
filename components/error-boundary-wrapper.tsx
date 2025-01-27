"use client"

import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"
import { ErrorBoundary } from "./error-boundary"

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  useEffect(() => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
    })
  }, [])

  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div className="flex min-h-[400px] items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Something went wrong!</h2>
            <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
            <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
              Try again
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}


"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error)
  }, [error])

  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p className="text-sm">{error.message || "An unexpected error occurred. Please try again later."}</p>
          {error.digest && <p className="text-xs font-mono">Error ID: {error.digest}</p>}
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}


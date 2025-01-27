import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  text?: string
  className?: string
}

export function LoadingState({ text = "Loading...", className = "" }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`} role="status" aria-label={text}>
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}


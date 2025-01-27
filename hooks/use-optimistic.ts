import { useState, useCallback } from "react"

interface OptimisticState<T> {
  data: T
  pending: boolean
  error: Error | null
}

export function useOptimistic<T>(initialData: T) {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    pending: false,
    error: null,
  })

  const mutate = useCallback(async (updateFn: (current: T) => T, commitFn: () => Promise<T>) => {
    setState((current) => ({
      ...current,
      data: updateFn(current.data),
      pending: true,
      error: null,
    }))

    try {
      const result = await commitFn()
      setState((current) => ({
        ...current,
        data: result,
        pending: false,
      }))
      return result
    } catch (error) {
      setState((current) => ({
        ...current,
        error: error as Error,
        pending: false,
      }))
      throw error
    }
  }, [])

  return [state, mutate] as const
}


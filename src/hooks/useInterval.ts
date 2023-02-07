import { useEffect } from "react"

export function useInterval(...params: Parameters<typeof setInterval>) {
  useEffect(() => {
    const timerId = setInterval(...params)
    return () => {
      clearInterval(timerId)
    }
  }, [])
}

import { useState } from "react"

export function useRenderForcibly() {
  const [, set] = useState({})

  const renderForcibly = () => {
    set({})
  }

  return renderForcibly
}

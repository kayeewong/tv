'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const Error = ({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) => {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="grid place-content-center w-screen h-screen">
      <p className="font-semibold text-2xl mb-3">{error.message}</p>
      <Button
        onClick={() => reset()}
        variant="destructive"
        className="w-fit mx-auto"
      >
        Try Again
      </Button>
    </div>
  )
}
export default Error
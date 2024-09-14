'use client'

import { useEffect, useState } from "react"
import AppContext from "@/context/appContext"

const ContextProvider = ({children} : {children: React.ReactNode}) => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const [renderComponent, setRenderCompoent] = useState(false)

  useEffect(() => {
    setRenderCompoent(true)
  }, [])

  if (!renderComponent) return <></>

  return (
    <AppContext.Provider value={{ showNav, setShowNav }}>
      {children}
    </AppContext.Provider>
  )
}
export default ContextProvider
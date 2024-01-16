"use client"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const matches = useMediaQuery("(max-width: 1024px)")

  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onExpand, onCollapse])

  return (
    <div
      className={
        (cn("flex-1 bg-red-300"),
        collapsed ? `pl-[70px]` : "ml-[70px] lg:ml-60")
      }
    >
      {children}
    </div>
  )
}

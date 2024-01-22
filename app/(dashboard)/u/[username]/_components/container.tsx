"use client"

import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import React, { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const matches = useMediaQuery("(max-width: 1024px)")

  const { collapsed, onExpand, onCollapse } = useCreatorSidebar(
    (state) => state
  )

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onExpand, onCollapse])

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  )
}

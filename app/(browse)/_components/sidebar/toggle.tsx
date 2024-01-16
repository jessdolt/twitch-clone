"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

import { useSidebar } from "@/store/use-sidebar"

import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)

  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="hidden pt-4 mb-4 lg:flex items-center justify-center w-full ">
          <Hint label={label} asChild side="right">
            <Button
              className="h-auto p-2 mx-auto"
              variant="ghost"
              onClick={onExpand}
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} asChild side="right">
            <Button
              className="h-auto p-2 ml-auto"
              variant="ghost"
              onClick={onCollapse}
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

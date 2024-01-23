"use client"

import { Input } from "@/components/ui/input"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface KeyCardProps {
  value: string | null
}

export const KeyCard: React.FC<KeyCardProps> = ({ value }) => {
  const [show, setShow] = useState(false)

  const onShow = () => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 2500)
  }

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              disabled
              placeholder="Stream Key"
              type={show ? "text" : "password"}
            />
            <CopyButton value={value || ""} />
          </div>
          <Button size="sm" variant="link" onClick={onShow} disabled={show}>
            Show
          </Button>
        </div>
      </div>
    </div>
  )
}

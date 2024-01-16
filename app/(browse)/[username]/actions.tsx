"use client"

import { onFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
  userId: string
  isFollowing: boolean
}

export const Actions: React.FC<ActionsProps> = ({ userId, isFollowing }) => {
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(async () => {
      try {
        await onFollow(userId)
        toast.success("Followed!")
      } catch (e) {
        console.log(e)
        toast.error("Error!")
      }
    })
  }

  return (
    <Button disabled={isPending} onClick={onClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

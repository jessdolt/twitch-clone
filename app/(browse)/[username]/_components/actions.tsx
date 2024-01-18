"use client"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
  userId: string
  isFollowing: boolean
}

export const Actions: React.FC<ActionsProps> = ({ userId, isFollowing }) => {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
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

  const handleUnfollow = () => {
    startTransition(async () => {
      try {
        await onUnfollow(userId)
        toast.success("Unfollowed!")
      } catch (e) {
        console.log(e)
        toast.error("Error!")
      }
    })
  }

  const onClick = () => {
    isFollowing ? handleUnfollow() : handleFollow()
  }

  return (
    <Button disabled={isPending} onClick={onClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

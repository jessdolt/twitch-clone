"use client"

import { onBlock, onUnblock } from "@/actions/block"
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

  const handleBlock = () => {
    startTransition(async () => {
      try {
        await onBlock(userId)
        toast.success("User Blocked!")
      } catch (e) {
        console.log(e)
        toast.error("Error!")
      }
    })
  }

  const handleUnblock = () => {
    startTransition(async () => {
      try {
        await onUnblock(userId)
        toast.success("User Unblocked!")
      } catch (e) {
        console.log(e)
        toast.error("Error!")
      }
    })
  }

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

      <Button disabled={isPending} onClick={handleBlock}>
        Block
      </Button>
    </>
  )
}

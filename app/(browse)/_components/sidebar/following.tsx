"use client"

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import React from "react"
import { UserItem, UserItemSkeleton } from "./user-item"

interface FollowingProps {
  data: (Follow & { following: User })[]
}

export const Following: React.FC<FollowingProps> = ({ data }) => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)

  if (!data.length) {
    return null
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.following.id}
            username={user.following.username}
            imageUrl={user.following.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 py-2 lg:pt-0">
      {[...Array(3)].map((_, i) => {
        return <UserItemSkeleton key={i} />
      })}
    </ul>
  )
}
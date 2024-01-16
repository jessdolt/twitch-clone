"use client"

import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import React from "react"
import { UserItem, UserItemSkeleton } from "./user-item"

interface RecommendedProps {
  data: User[]
}

export const Recommended: React.FC<RecommendedProps> = ({ data }) => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)

  const showLabel = !collapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul>
      {[...Array(3)].map((_, i) => {
        return <UserItemSkeleton key={i} />
      })}
    </ul>
  )
}
import { isFollowingUser } from "@/lib/follow-service"
import { getuserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import React from "react"
import { Actions } from "./_components/actions"
import { isBlockedByUser } from "@/lib/block-service"

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPageProps> = async ({ params: { username } }) => {
  const user = await getuserByUsername(username)

  if (!user) notFound()

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) {
    notFound()
  }

  console.log(isBlocked)
  return (
    <div className="flex flex-col gap-y-4 ">
      <p>User: {user.username}</p>
      <p>User Id: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <p>is blocked by this user: {`${isBlocked}`}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  )
}

export default UserPage

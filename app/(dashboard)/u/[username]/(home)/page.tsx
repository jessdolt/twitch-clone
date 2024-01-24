import { StreamPlayer } from "@/components/stream-player"
import { getUserByUsername } from "@/lib/user-service"
import { currentUser } from "@clerk/nextjs"
import React from "react"

interface CreatorPageProps {
  params: {
    username: string
  }
}

const CreatorPage: React.FC<CreatorPageProps> = async ({
  params: { username },
}) => {
  const externalUser = await currentUser()
  const user = await getUserByUsername(username)

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Not found")
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  )
}

export default CreatorPage

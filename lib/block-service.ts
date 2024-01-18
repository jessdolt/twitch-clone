import { getSelf } from "./auth-service"
import { db } from "./db"

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    })

    if (!otherUser) {
      throw new Error("user not found")
    }

    if (otherUser.id === self.id) {
      return false
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    })

    return !!existingBlock
  } catch (e) {
    throw new Error("Internal Server")
  }
}

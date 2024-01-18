import { getSelf } from "./auth-service"
import { db } from "./db"

export const unblockUser = async (id: string) => {
  try {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    })

    if (!otherUser) {
      throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
      throw new Error("You cannot unblock yourself")
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    })

    if (!existingBlock) {
      throw new Error("You have not blocked this user")
    }

    const unblockedUser = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocked: true,
      },
    })

    return unblockedUser
  } catch (e) {
    throw new Error("Internal Server Error")
  }
}

export const blockUser = async (id: string) => {
  try {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    })

    if (!otherUser) {
      throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
      throw new Error("You cannot block yourself")
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    })

    if (existingBlock) {
      throw new Error("You have already blocked this user")
    }

    const userBlocked = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocked: true,
      },
    })

    return userBlocked
  } catch (e) {
    console.log(e)
    throw new Error("Internal Server Error")
  }
}

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
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    })

    return !!existingBlock
  } catch (e) {
    throw new Error("Internal Server")
  }
}

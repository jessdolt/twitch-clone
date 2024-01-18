"use server"

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onBlock = async (id: string) => {
  // TODOS:
  // Adapt to disconnect from livestream
  // Allow ability to kick the guest in the live stream

  try {
    const blockedUser = await blockUser(id)
    revalidatePath("/")

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`)
    }

    return blockedUser
  } catch {
    throw new Error("Something went wrong")
  }
}

export const onUnblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id)
    revalidatePath("/")

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser
  } catch {
    throw new Error("Something went wrong")
  }
}

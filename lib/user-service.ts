import { db } from "./db"

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        stream: true,
      },
    })

    return user
  } catch (e) {
    return false
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },

      include: {
        stream: true,
      },
    })

    return user
  } catch (e) {
    return false
  }
}

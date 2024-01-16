import { db } from "./db"

export const getuserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    })

    return user
  } catch (e) {
    return false
  }
}

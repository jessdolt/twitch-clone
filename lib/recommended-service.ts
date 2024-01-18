import { db } from "./db"
import { getSelf } from "./auth-service"

export const getRecommended = async () => {
  let userId

  try {
    const self = await getSelf()
    userId = self.id
  } catch (e) {
    userId = null
  }

  let users = []

  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
    })
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  return users
}

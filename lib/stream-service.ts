import { db } from "./db"

export const getStreamsByUserId = async (userId: string) => {
  const streams = await db.stream.findUnique({
    where: {
      userId,
    },
  })

  return streams
}

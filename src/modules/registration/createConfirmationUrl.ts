import { v4 } from 'uuid'
import { redis } from '../../redis'

export default async function createConfirmationUrl(userId: number) {
  const token = v4()
  await redis.set(token, userId, 'ex', 60 * 60 * 24) // expire after 24 hours
  // redirect to frontend
  return `http://localhost:3000/u/confirm/${token}`
}

import { v4 } from 'uuid'
import { redis } from '../../redis'
import { REGISTRATION_PREFIX } from '../constants/redisPrefixes'

export function createConfirmationToken(token: string) {
  return `${REGISTRATION_PREFIX}${token}`
}

export default async function createConfirmationUrl(userId: number) {
  const token = v4()
  await redis.set(createConfirmationToken(token), userId, 'ex', 60 * 60 * 24) // expire after 24 hours
  // redirect to frontend
  return `http://localhost:3000/u/confirm/${token}`
}

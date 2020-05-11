import { Resolver, Mutation, Arg } from 'type-graphql'
import { v4 } from 'uuid'
import { User } from '../../../entities/User'
import { redis } from '../../../redis'
import { sendConfirmationEmail } from '../SendConfirmationEmail'
import { RECOVER_PASSWORD_PREFIX } from '../../../constants/redisPrefixes'

async function createRecoveryEmail(token: string) {
  return `http://localhost:3000/u/confirm/${token}`
}

export function createRecoverPasswordToken(token: string) {
  return `${RECOVER_PASSWORD_PREFIX}${token}`
}

@Resolver()
export class RecoverPasswordResolver {
  @Mutation(() => Boolean)
  async recoverPassword(@Arg('email') email: string): Promise<boolean> {
    try {
      const user = await User.findOneOrFail({ where: { email } })
      const token = v4()
      await redis.set(
        createRecoverPasswordToken(token),
        user.id,
        'ex',
        60 * 60 * 24
      ) // expire after 24 hours
      await sendConfirmationEmail(email, await createRecoveryEmail(token))

      return true
    } catch {
      // fake out bots trying to mine emails
      // @todo logging?
      return true
    }
  }
}

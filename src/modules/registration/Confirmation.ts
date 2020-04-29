import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entities/User'
import { redis } from '../../redis'

@Resolver()
export class ConfirmationResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    try {
      const userId = await redis.get(token)
      if (!userId) {
        // likely need to create a new confirmation email at this point
        // @todo the thing, a button on frontend to send new email
        return false
      }

      await User.update({ id: parseInt(userId, 10) }, { confirmed: true })
      await redis.del(token)

      return true
    } catch {
      return false
    }
  }
}

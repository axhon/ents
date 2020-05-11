import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../../../entities/User'
import { ChangePasswordInput } from './ChangePasswordInput'
import { redis } from '../../../../redis'
import { createRecoverPasswordToken } from '../RecoverPassword'
import { createHashedPassword } from '../createHashedPassword'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput
  ): Promise<User | null> {
    try {
      console.log(password)
      const id = await redis.get(createRecoverPasswordToken(token))

      if (!id) {
        return null
      }

      const user = await User.findOne({ where: { id } })
      if (!user) {
        return null
      }

      user.password = await createHashedPassword(password)
      await user.save()
      await redis.del(createRecoverPasswordToken(token))

      return user
    } catch {
      return null
    }
  }
}

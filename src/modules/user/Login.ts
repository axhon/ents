import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entities/User'
import Argon from 'argon2'
import { SessionContext } from '../../SessionContext'

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: SessionContext
  ): Promise<User | null> {
    try {
      const user = await User.findOneOrFail({ where: { email } })

      const isValid = await Argon.verify(user.password, password, {
        saltLength: 12,
      })

      if (!isValid) {
        return null
      }

      ctx.req.session!.userId = user.id

      return user
    } catch {
      return null
    }
  }
}

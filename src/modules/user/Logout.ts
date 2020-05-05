import { Resolver, Mutation, Ctx } from 'type-graphql'
import { SessionContext } from '../../SessionContext'

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: SessionContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy((error) => {
        if (error) {
          return reject(false)
        }
        ctx.res.clearCookie('qid')
        resolve(true)
      })
    })
  }
}

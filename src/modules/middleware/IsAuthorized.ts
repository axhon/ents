import { MiddlewareFn } from 'type-graphql'
import { SessionContext } from 'src/SessionContext'

export const isAuthorized: MiddlewareFn<SessionContext> = async (
  { context },
  next
) => {
  // in the future we wanna handle if a user is authorized to view certain data
  // today we only care they are signed in
  if (!context.req.session?.userId) {
    throw new Error('you are not authorized')
  }

  return next()
}

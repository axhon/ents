import 'reflect-metadata'
import Express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/Register'
import connectRedis from 'connect-redis'
import { redis } from './redis'
import cors from 'cors'
import { LoginResolver } from './modules/user/Login'

async function main() {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  })

  const apolloServer = new ApolloServer({
    schema,
    // expose the express request context
    context: ({ req }) => ({ req }),
  })
  const app = Express()

  app.use(
    cors({
      credentials: true,
      // @todo set origin
    })
  )

  const RedisStore = connectRedis(session)

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      name: 'qid',
      secret: 'i feel in colors',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 30, // 30 minutes
      },
    })
  )

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('graphql listening on http://localhost:4000/graphql')
  })
}

main()

import 'reflect-metadata'
import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/Register'

async function main() {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  })

  const apolloServer = new ApolloServer({ schema })
  const app = Express()
  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('graphql listening on http://localhost:4000/graphql')
  })
}

main()

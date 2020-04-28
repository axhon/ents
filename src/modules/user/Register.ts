import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../../entities/User'
import { RegistInput } from './RegisterInput'
import Argon from 'argon2'

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'hello world'
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { firstName, lastName, email, password }: RegistInput
  ): Promise<User> {
    const hashedPassword = await Argon.hash(password, { saltLength: 12 })
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()
    return user
  }
}

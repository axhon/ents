import { Length, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailAlreadyExists } from './IsEmailAlreadyExists'

@InputType()
export class RegistInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({ message: 'email already exists' })
  email: string

  @Field()
  password: string
}

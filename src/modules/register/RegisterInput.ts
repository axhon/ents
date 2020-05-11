import { Length, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailAlreadyExists } from './IsEmailAlreadyExists'
import { PasswordInput } from '../user/password/PasswordInput'

@InputType()
export class RegistInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({
    message: 'email already exists',
  })
  email: string
}

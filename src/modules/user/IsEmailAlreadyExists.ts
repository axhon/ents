import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
} from 'class-validator'
import { User } from '../../../src/entities/User'

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistsConstraint
  implements ValidatorConstraintInterface {
  validate(email: string) {
    // if we find a user then it is an invalid register
    return User.findOne({ where: { email } }).then((user) => !user)
  }
}

export function IsEmailAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistsConstraint,
    })
  }
}

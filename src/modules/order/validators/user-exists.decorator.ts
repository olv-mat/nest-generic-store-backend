import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserExistsConstraint } from './user-exists.constraint';

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UserExistsConstraint,
    });
  };
}

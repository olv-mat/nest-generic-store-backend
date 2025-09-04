import { registerDecorator, ValidationOptions } from 'class-validator';
import { ProductsExistsConstraint } from './products-exists.constraint';

export function ProductsExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ProductsExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ProductsExistsConstraint,
    });
  };
}

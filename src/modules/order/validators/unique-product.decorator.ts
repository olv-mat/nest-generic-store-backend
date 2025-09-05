import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueProductConstraint } from './unique-product.constraint';

export function UniqueProduct(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UniqueProduct',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueProductConstraint,
    });
  };
}

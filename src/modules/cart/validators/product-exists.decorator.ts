import { registerDecorator, ValidationOptions } from 'class-validator';
import { ProductExistsConstraint } from '../../cart/validators/product-exists.constraint';

export function ProductExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ProductExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ProductExistsConstraint,
    });
  };
}

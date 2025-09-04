import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { UserExists } from '../validators/user-exists.decorator';
import { ProductsExists } from '../validators/products-exists.decorator';

export class CreateOrderDto {
  @IsNotEmpty()
  @UserExists({ message: 'this user does not exist' })
  user: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Matches(/\S/, {
    each: true,
    message: 'products cannot contain only spaces',
  })
  @ProductsExists({ message: 'one or more selected products do not exist' })
  products: string[];
}

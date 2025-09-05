import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserExists } from '../validators/user-exists.decorator';
import { CreateOrderItemDto } from './CreateOrderItem.dto';
import { UniqueProduct } from '../validators/unique-product.decorator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @UserExists({ message: 'this user does not exist' })
  user: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true, message: 'each item must be a valid object' })
  @Type(() => CreateOrderItemDto)
  @UniqueProduct({
    message: 'each product must appear only once in the order items',
  })
  items: CreateOrderItemDto[];
}

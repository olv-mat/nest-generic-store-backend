import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ProductExists } from '../validators/product-exists.decorator';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  @ProductExists({ message: 'this product does not exist' })
  product: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}

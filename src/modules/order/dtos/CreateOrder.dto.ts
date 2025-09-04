import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  products: string[];
}

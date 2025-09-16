import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}

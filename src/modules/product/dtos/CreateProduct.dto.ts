import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { CategoryExists } from '../validators/category-exists.decorator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Matches(/\S/, { message: 'product cannot contain only spaces' })
  product: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Matches(/\S/, { message: 'price cannot contain only spaces' })
  price: string;

  @IsNotEmpty()
  @CategoryExists({ message: 'this category does not exist' })
  categoryId: string;
}

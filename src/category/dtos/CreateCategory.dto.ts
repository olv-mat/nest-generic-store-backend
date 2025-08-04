import { IsEnum } from 'class-validator';
import { Categories } from '../enums/categories.enum';

/* npm install class-validator class-transformer */

export class CreateCategoryDto {
  @IsEnum(Categories)
  name: Categories;
}

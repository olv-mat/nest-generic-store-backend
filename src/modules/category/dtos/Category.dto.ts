import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

/* npm install class-validator class-transformer */

export class CategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/\S/, { message: 'category cannot contain only spaces' })
  category: string;
}

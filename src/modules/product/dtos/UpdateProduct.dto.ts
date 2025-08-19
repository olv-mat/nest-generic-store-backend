import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Matches(/\S/, { message: 'product cannot contain only spaces' })
  product?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Matches(/\S/, { message: 'price cannot contain only spaces' })
  price?: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/\S/, { message: 'name cannot contain only spaces' })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(1)
  @MaxLength(255)
  @Matches(/\S/, { message: 'email cannot contain only spaces' })
  email?: string;
}

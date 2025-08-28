import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Matches(/\S/, { message: 'name cannot contain only spaces' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @Matches(/\S/, { message: 'email cannot contain only spaces' })
  email: string;
}

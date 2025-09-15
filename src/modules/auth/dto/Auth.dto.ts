import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @Matches(/\S/, { message: 'email cannot contain only spaces' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\S/, { message: 'password cannot contain only spaces' })
  password: string;
}

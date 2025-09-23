import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/Login.dto';
import { LoginResponseDto } from './dtos/LoginResponse.dto';
import { RegisterDto } from './dtos/Register.dto';
import { RegisterResponseDto } from './dtos/RegisterResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('register')
  public async register(
    @Body() dto: RegisterDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(dto);
  }
}

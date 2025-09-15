import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/Auth.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() dto: AuthDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }
}

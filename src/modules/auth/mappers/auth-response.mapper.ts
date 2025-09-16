import { Injectable } from '@nestjs/common';
import { LoginResponseDto } from '../dto/LoginResponse.dto';
import { RegisterResponseDto } from '../dto/RegisterResponse.dto';

@Injectable()
export class AuthResponseMapper {
  public toLoginResponse(token: string): LoginResponseDto {
    return new LoginResponseDto(token);
  }

  public toRegisterResponse(
    token: string,
    userId: string,
    cartId: string,
    message: string,
  ): RegisterResponseDto {
    return new RegisterResponseDto(token, userId, cartId, message);
  }
}

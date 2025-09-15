import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AuthDto } from './dto/Auth.dto';
import { AuthResponseDto } from './dto/AuthResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRespository: Repository<UserEntity>,
  ) {}

  public async login(dto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.findUserByEmail(dto.email);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, name: user.name, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return new AuthResponseDto(accessToken);
  }

  private async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRespository.findOne({
      where: { email: email },
      select: ['id', 'name', 'email', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}

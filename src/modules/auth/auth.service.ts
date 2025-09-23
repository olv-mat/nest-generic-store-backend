import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CartService } from '../cart/services/cart.service';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/Login.dto';
import { LoginResponseDto } from './dtos/LoginResponse.dto';
import { RegisterDto } from './dtos/Register.dto';
import { RegisterResponseDto } from './dtos/RegisterResponse.dto';
import { AuthResponseMapper } from './mappers/auth-response.mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly authResponseMapper: AuthResponseMapper,
    private readonly cartService: CartService,
  ) {}

  public async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.findUserByEmail(dto.email);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.generateToken(user);
    return this.authResponseMapper.toLoginResponse(token);
  }

  public async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    await this.checkUserExists(dto.email);
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save({
      ...dto,
      password: hashedPassword,
    });
    const token = this.generateToken(user);
    const cart = await this.cartService.createCart(user);
    return this.authResponseMapper.toRegisterResponse(
      token,
      user.id,
      cart.id,
      'User created successfully',
    );
  }

  private async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private async checkUserExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new ConflictException('User already exists');
    }
  }

  private generateToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}

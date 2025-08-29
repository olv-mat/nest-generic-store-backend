import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserEntity } from './entities/user.entity';
import { sanitizeUpdatePayload } from 'src/common/utils/sanitize-update-payload.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findOne(uuid: string): Promise<UserEntity> {
    return this.findUserById(uuid);
  }

  public async create(dto: CreateUserDto): Promise<ResponseDto> {
    await this.checkUserExists(dto.email);
    const user = await this.userRepository.save(dto);
    return this.responseMapper.toResponse(user.id, 'User created successfully');
  }

  public async update(uuid: string, dto: UpdateUserDto): Promise<ResponseDto> {
    const user = await this.findUserById(uuid);
    const updateData = sanitizeUpdatePayload(dto);
    await this.userRepository.update(user.id, updateData);
    return this.responseMapper.toResponse(user.id, 'User updated successfully');
  }

  private async findUserById(uuid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async checkUserExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new ConflictException('Email already in use');
    }
  }
}

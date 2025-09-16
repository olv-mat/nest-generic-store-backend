import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { validateUpdatePayload } from 'src/common/utils/validate-update-payload.util';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserEntity } from './entities/user.entity';

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
    return await this.findUserById(uuid);
  }

  public async update(uuid: string, dto: UpdateUserDto): Promise<ResponseDto> {
    const user = await this.findUserById(uuid);
    const updatePayload = validateUpdatePayload(dto);

    if (updatePayload.email) {
      await this.validateEmail(updatePayload.email);
    }

    if (updatePayload.password) {
      updatePayload.password = await bcrypt.hash(updatePayload.password, 10);
    }

    await this.userRepository.update(user.id, updatePayload);
    return this.responseMapper.toResponse(user.id, 'User updated successfully');
  }

  public async delete(uuid: string): Promise<ResponseDto> {
    const user = await this.findUserById(uuid);
    await this.userRepository.delete(user.id);
    return this.responseMapper.toResponse(user.id, 'User deleted successfully');
  }

  private async findUserById(uuid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async validateEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new ConflictException('Email already in use');
    }
  }
}

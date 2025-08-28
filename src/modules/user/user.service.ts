import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findOne(uuid: string): Promise<UserEntity> {
    return this.findUserById(uuid);
  }

  private async findUserById(uuid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

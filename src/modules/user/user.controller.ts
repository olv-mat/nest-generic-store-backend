import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UuidDTO } from 'src/common/dtos/Uuid.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDTO): Promise<UserEntity> {
    return await this.userService.findOne(uuid);
  }
}

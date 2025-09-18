import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDto): Promise<UserEntity> {
    return await this.userService.findOne(uuid);
  }

  @Patch(':uuid')
  public async update(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateUserDto,
  ): Promise<DefaultResponseDto> {
    return await this.userService.update(uuid, dto);
  }

  @Delete(':uuid')
  public async delete(@Param() { uuid }: UuidDto): Promise<DefaultResponseDto> {
    return await this.userService.delete(uuid);
  }
}

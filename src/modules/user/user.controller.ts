import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { ResponseDto } from 'src/common/dtos/Response.dto';

@Controller('user')
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

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<ResponseDto> {
    return await this.userService.create(dto);
  }
}

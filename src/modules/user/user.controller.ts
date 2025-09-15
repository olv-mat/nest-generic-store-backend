import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDto): Promise<UserEntity> {
    return await this.userService.findOne(uuid);
  }

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<ResponseDto> {
    return await this.userService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':uuid')
  public async update(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseDto> {
    return await this.userService.update(uuid, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':uuid')
  public async delete(@Param() { uuid }: UuidDto): Promise<ResponseDto> {
    return await this.userService.delete(uuid);
  }
}

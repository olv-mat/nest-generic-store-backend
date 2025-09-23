import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoles } from './enums/user-roles.enum';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  @Roles(...Object.values(UserRoles))
  public async findOne(@Param() { uuid }: UuidDto): Promise<UserEntity> {
    return await this.userService.findOne(uuid);
  }

  @Patch(':uuid')
  @Roles(...Object.values(UserRoles))
  public async update(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateUserDto,
  ): Promise<DefaultResponseDto> {
    return await this.userService.update(uuid, dto);
  }

  @Delete(':uuid')
  @Roles(...Object.values(UserRoles))
  public async delete(@Param() { uuid }: UuidDto): Promise<DefaultResponseDto> {
    return await this.userService.delete(uuid);
  }
}

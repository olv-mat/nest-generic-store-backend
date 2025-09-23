import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';

@Controller('orders')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':uuid')
  @Roles(...Object.values(UserRoles))
  public async findOne(@Param() { uuid }: UuidDto): Promise<OrderEntity> {
    return this.orderService.findOne(uuid);
  }

  @Post()
  @Roles(...Object.values(UserRoles))
  public async create(
    @Body() dto: CreateOrderDto,
  ): Promise<DefaultResponseDto> {
    return this.orderService.create(dto);
  }

  @Post(':uuid/pay')
  @Roles(...Object.values(UserRoles))
  public async pay(@Param() { uuid }: UuidDto): Promise<DefaultResponseDto> {
    return this.orderService.pay(uuid);
  }

  @Delete(':uuid')
  @Roles(...Object.values(UserRoles))
  public async delete(@Param() { uuid }: UuidDto): Promise<DefaultResponseDto> {
    return await this.orderService.delete(uuid);
  }
}

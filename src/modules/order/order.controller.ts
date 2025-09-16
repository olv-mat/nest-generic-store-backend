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
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { UpdateOrderDto } from './dtos/UpdateOrder.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDto): Promise<OrderEntity> {
    return this.orderService.findOne(uuid);
  }

  @Post()
  public async create(@Body() dto: CreateOrderDto): Promise<ResponseDto> {
    return this.orderService.create(dto);
  }

  @Patch(':uuid')
  public async update(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateOrderDto,
  ): Promise<ResponseDto> {
    return this.orderService.update(uuid, dto);
  }

  @Delete(':uuid')
  public async delete(@Param() { uuid }: UuidDto): Promise<ResponseDto> {
    return this.orderService.delete(uuid);
  }
}

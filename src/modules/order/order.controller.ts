import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

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
  public async create(
    @Body() dto: CreateOrderDto,
  ): Promise<DefaultResponseDto> {
    return this.orderService.create(dto);
  }

  @Post(':uuid/pay')
  public async pay(@Param() { uuid }: UuidDto): Promise<DefaultResponseDto> {
    return this.orderService.pay(uuid);
  }

  @Delete(':uuid')
  public async delete(@Param() { uuid }: UuidDto): Promise<DefaultResponseDto> {
    return await this.orderService.delete(uuid);
  }
}

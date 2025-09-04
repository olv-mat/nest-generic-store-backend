import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateOrderDto } from './dtos/CreateOrder.dto';

@Controller('order')
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
  public async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}

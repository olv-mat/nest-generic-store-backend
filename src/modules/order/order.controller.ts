import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';

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
}

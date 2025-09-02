import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }
}

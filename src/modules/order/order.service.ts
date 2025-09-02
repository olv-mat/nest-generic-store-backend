import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  public async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  public async findOne(uuid: string): Promise<OrderEntity> {
    return this.findOrderById(uuid);
  }

  private async findOrderById(uuid: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({ where: { id: uuid } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}

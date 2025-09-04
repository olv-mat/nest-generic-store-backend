import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  public async findOne(uuid: string): Promise<OrderEntity> {
    return this.findOrderById(uuid);
  }

  public async create(dto: CreateOrderDto) {
    const user = await this.userRepository.findOneByOrFail({ id: dto.user });
    const products = await this.productRepository.findBy({
      id: In(dto.products),
    });
    const totalPrice = products
      .reduce((sum, product) => sum + Number(product.price), 0)
      .toFixed(2);

    const newOrder = this.orderRepository.create({
      user: user,
      products: products,
      totalPrice: totalPrice,
      status: OrderStatus.PENDING,
    });
    const order = await this.orderRepository.save(newOrder);
    return this.responseMapper.toResponse(
      order.id,
      'Order created successfully',
    );
  }

  private async findOrderById(uuid: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({ where: { id: uuid } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}

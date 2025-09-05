import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';

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

  public async create(dto: CreateOrderDto): Promise<ResponseDto> {
    /* 
      Steps:
      1. Find The User Who Is Placing The Order (Throws If Not Found)
      2. Extract Items From The Request Dto (Contains Product Uuid And Quantity)
      3. Load All Products Referenced In The Order With a Single Query (Returns Product Entities)
      4. Build a Map For Quick Product Lookup By Uuid (Uuid => ProductEntity)
      5. Create Order Items Linking Each Dto Item To The Actual Product Entity (Contains ProductEntity And Quantity)
      6. Calculate The Total Price Of The Order With Two Decimal Places
      7. Save The New Order In The Database
      8. Return a Standardized Response With Order Uuid And Success Message
    */

    const user = await this.userRepository.findOneByOrFail({ id: dto.user });
    const items = dto.items;
    const products = await this.productRepository.findBy({
      id: In(items.map((i) => i.product)),
    });
    const productMap = new Map(products.map((p) => [p.id, p]));
    const orderItems = items.map(
      (item) =>
        ({
          product: productMap.get(item.product)!,
          quantity: item.quantity,
        }) as OrderItemEntity,
    );
    const totalPrice = orderItems
      .reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0,
      )
      .toFixed(2);
    const order = await this.orderRepository.save({
      user: user,
      items: orderItems,
      totalPrice: totalPrice,
    });
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

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CartStatus } from '../cart/enums/cart-status.enum';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly cartService: CartService,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  public async findOne(uuid: string): Promise<OrderEntity> {
    return this.findOrderById(uuid);
  }

  public async create(dto: CreateOrderDto): Promise<ResponseDto> {
    const cart = await this.cartService.findCartById(dto.cart);

    if (cart.status !== CartStatus.OPEN) {
      throw new BadRequestException('Cart not available for order');
    }

    const total_price = cart.items
      .reduce((acc, item) => {
        const price = Number(item.product.price);
        return acc + price * item.quantity;
      }, 0)
      .toFixed(2);

    const order = await this.orderRepository.save({
      cart: cart,
      totalPrice: total_price,
    });

    await this.cartService.closeCart(cart);

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

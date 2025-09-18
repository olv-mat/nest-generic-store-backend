import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from 'src/common/dtos/DefaultResponse.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { Repository } from 'typeorm';
import { CartStatus } from '../cart/enums/cart-status.enum';
import { CartService } from '../cart/services/cart.service';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  public async findOne(uuid: string): Promise<OrderEntity> {
    return this.findOrderById(uuid);
  }

  public async create(dto: CreateOrderDto): Promise<DefaultResponseDto> {
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

    await this.cartService.changeCartStatus(cart, CartStatus.CLOSED);

    return this.responseMapper.toResponse(
      order.id,
      'Order created successfully',
    );
  }

  public async complete(uuid: string) {
    const order = await this.findOrderById(uuid);
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        'Order cannot be COMPLETED with current status',
      );
    }

    const user = await this.userService.findUserById(order.cart.user.id);
    await this.orderRepository.update(order.id, {
      status: OrderStatus.COMPLETED,
    });
    await this.cartService.createCart(user);
    return this.responseMapper.toMessageResponse(
      'Order successfully COMPLETED',
    );
  }

  private async findOrderById(uuid: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id: uuid },
      relations: ['cart', 'cart.user'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}

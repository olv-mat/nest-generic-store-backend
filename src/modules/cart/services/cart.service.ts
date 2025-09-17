import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { Repository } from 'typeorm';
import { ProductService } from '../../product/product.service';
import { UserEntity } from '../../user/entities/user.entity';
import { UpdateCartItemDto } from '../dtos/UpdateCartItem.dto';
import { CartEntity } from '../entities/cart.entity';
import { CartStatus } from '../enums/cart-status.enum';
import { CartItemService } from './cart-item.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly productService: ProductService,
    private readonly cartItemService: CartItemService,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find();
  }

  public async findOne(uuid: string): Promise<CartEntity> {
    return await this.findCartById(uuid);
  }

  public async add(
    uuid: string,
    dto: UpdateCartItemDto,
  ): Promise<MessageResponseDto> {
    const cart = await this.findCartById(uuid);
    const product = await this.productService.findProductById(dto.product);
    await this.cartItemService.addOrUpdate(cart, product, dto.quantity);
    return this.responseMapper.toMessageResponse(
      'Item successfully added to cart',
    );
  }

  public async createCart(user: UserEntity): Promise<CartEntity> {
    return await this.cartRepository.save({
      user: user,
    });
  }

  public async closeCart(cart: CartEntity): Promise<void> {
    await this.cartRepository.update(cart.id, { status: CartStatus.CLOSED });
  }

  public async findCartById(uuid: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({ where: { id: uuid } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }
}

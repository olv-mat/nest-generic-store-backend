import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UserEntity } from '../user/entities/user.entity';
import { AddItemDto } from './dtos/AddItem.dto';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartStatus } from './enums/cart-status.enum';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly productService: ProductService,
  ) {}

  public async findAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find();
  }

  public async findOne(uuid: string): Promise<CartEntity> {
    return await this.findCartById(uuid);
  }

  public async createCart(user: UserEntity) {
    return await this.cartRepository.save({
      user: user,
    });
  }

  public async addItem(uuid: string, dto: AddItemDto): Promise<string> {
    const cart = await this.findCartById(uuid);
    const product = await this.productService.findProductById(dto.productId);
    await this.cartItemRepository.save({
      cart: cart,
      product: product,
      quantity: dto.quantity,
    });
    return 'Item successfully added to cart';
  }

  public async closeCart(cart: CartEntity) {
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

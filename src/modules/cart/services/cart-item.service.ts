import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';
import { CartEntity } from '../entities/cart.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  public async addOrUpdate(
    cart: CartEntity,
    product: ProductEntity,
    quantity: number,
  ): Promise<CartItemEntity> {
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id,
    );
    const item = existingItem
      ? { ...existingItem, quantity: existingItem.quantity + quantity }
      : { cart, product, quantity };

    return this.cartItemRepository.save(item);
  }
}

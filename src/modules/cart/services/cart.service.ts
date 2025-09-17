import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CartEntity } from '../entities/cart.entity';
import { CartStatus } from '../enums/cart-status.enum';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  public async findAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find();
  }

  public async findOne(uuid: string): Promise<CartEntity> {
    return await this.findCartById(uuid);
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

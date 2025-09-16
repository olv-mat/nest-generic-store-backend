import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

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

  public async createCart(user: UserEntity) {
    return await this.cartRepository.save({
      user: user,
    });
  }

  private async findCartById(uuid: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({ where: { id: uuid } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }
}

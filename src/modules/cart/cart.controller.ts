import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  public async findAll(): Promise<CartEntity[]> {
    return this.cartService.findAll();
  }
}

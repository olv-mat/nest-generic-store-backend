import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { UuidDto } from 'src/common/dtos/Uuid.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  public async findAll(): Promise<CartEntity[]> {
    return await this.cartService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDto) {
    return await this.cartService.findOne(uuid);
  }
}

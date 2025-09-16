import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { AddItemDto } from './dtos/AddItem.dto';

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

  @Post(':uuid/items')
  public async addItem(@Param() { uuid }: UuidDto, @Body() dto: AddItemDto) {
    return await this.cartService.addItem(uuid, dto);
  }
}

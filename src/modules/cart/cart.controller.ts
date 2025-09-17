import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { UpdateCartItemDto } from './dtos/UpdateCartItem.dto';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './services/cart.service';

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

  @Post(':uuid/add')
  public async add(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateCartItemDto,
  ): Promise<MessageResponseDto> {
    return await this.cartService.add(uuid, dto);
  }
}

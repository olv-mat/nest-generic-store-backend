import { Body, Controller, Param, Patch } from '@nestjs/common';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { UpdateCartItemDto } from '../dtos/UpdateCartItem.dto';
import { CartItemService } from '../services/cart-item.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart Item')
@Controller('carts/:uuid/items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Patch('increase')
  public async increase(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateCartItemDto,
  ): Promise<MessageResponseDto> {
    return await this.cartItemService.increase(uuid, dto);
  }

  @Patch('decrease')
  public async decrease(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateCartItemDto,
  ): Promise<MessageResponseDto> {
    return await this.cartItemService.decrease(uuid, dto);
  }
}

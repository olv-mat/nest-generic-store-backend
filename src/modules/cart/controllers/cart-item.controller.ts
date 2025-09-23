import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { MessageResponseDto } from 'src/common/dtos/MessageResponse.dto';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { UpdateCartItemDto } from '../dtos/UpdateCartItem.dto';
import { CartItemService } from '../services/cart-item.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';

@ApiTags('Cart Item')
@Controller('carts/:uuid/items')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Patch('increase')
  @Roles(...Object.values(UserRoles))
  public async increase(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateCartItemDto,
  ): Promise<MessageResponseDto> {
    return await this.cartItemService.increase(uuid, dto);
  }

  @Patch('decrease')
  @Roles(...Object.values(UserRoles))
  public async decrease(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateCartItemDto,
  ): Promise<MessageResponseDto> {
    return await this.cartItemService.decrease(uuid, dto);
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UuidDto } from 'src/common/dtos/Uuid.dto';
import { CartEntity } from '../entities/cart.entity';
import { CartService } from '../services/cart.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';

@Controller('carts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public async findAll(): Promise<CartEntity[]> {
    return await this.cartService.findAll();
  }

  @Get(':uuid')
  @Roles(...Object.values(UserRoles))
  public async findOne(@Param() { uuid }: UuidDto) {
    return await this.cartService.findOne(uuid);
  }
}

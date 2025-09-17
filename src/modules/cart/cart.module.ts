import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { ProductModule } from '../product/product.module';
import { CartController } from './cart.controller';
import { CartItemEntity } from './entities/cart-item.entity';
import { CartEntity } from './entities/cart.entity';
import { CartItemService } from './services/cart-item.service';
import { CartService } from './services/cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartItemService, ResponseMapper],
  exports: [CartService],
})
export class CartModule {}

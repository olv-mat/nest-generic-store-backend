import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { UserExistsConstraint } from './validators/user-exists.constraint';
import { ProductExistsConstraint } from './validators/product-exists.constraint';
import { UniqueProductConstraint } from './validators/unique-product.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity])],
  controllers: [OrderController],
  providers: [
    OrderService,
    ResponseMapper,
    UserExistsConstraint,
    ProductExistsConstraint,
    UniqueProductConstraint,
  ],
})
export class OrderModule {}

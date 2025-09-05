import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column({ type: 'int', nullable: false })
  quantity: number;
}

import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    eager: true,
    cascade: true,
  })
  items: OrderItemEntity[];

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}

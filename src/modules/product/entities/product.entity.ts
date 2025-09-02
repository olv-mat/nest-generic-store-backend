import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  /*
    @ManyToOne -> @OneToMany: @ManyToOne Is The Owner (FK In This Table)
    @OneToOne -> @OneToOne: One Side Must Be The Owner (FK With @JoinColumn)
    @ManyToMany -> @ManyToMany: Join Table Holds Both FKs (With @JoinTable)
  */

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  product: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}

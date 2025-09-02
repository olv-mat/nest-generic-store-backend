import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false, select: false })
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user, {
    eager: true,
  })
  orders: OrderEntity[];
}

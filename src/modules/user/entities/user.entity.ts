import { CartEntity } from 'src/modules/cart/entities/cart.entity';
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

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}

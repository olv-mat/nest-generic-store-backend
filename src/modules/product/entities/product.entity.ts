import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/*
  @ManyToOne -> @OneToMany: @ManyToOne Is The Owner (FK In This Table)
  @OneToOne -> @OneToOne: One Side Must Be The Owner (FK With @JoinColumn)
  @ManyToMany -> @ManyToMany: @JoinTable Creates The Join Table (FKs From Both Sides)
*/

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  product: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}

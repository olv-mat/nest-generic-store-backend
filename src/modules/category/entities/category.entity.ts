import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  category: string;

  @OneToMany(() => ProductEntity, (product) => product.categoryId)
  products: ProductEntity[];
}

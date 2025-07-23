import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Categories } from '../enums/categories.enum';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Categories, nullable: false })
  name: Categories;
}

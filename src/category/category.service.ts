import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { ResponseDTO } from './dtos/Response.dto';
import { Categories } from './enums/categories.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async findOne(uuid: string): Promise<CategoryEntity> {
    const category = await this.findCategoryById(uuid);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.findCategoryByName(dto.name);
    if (existing) {
      throw new BadRequestException('Category already exists');
    }
    const category = await this.categoryRepository.save(dto);
    return new ResponseDTO(category.id, 'Category created sucessfully');
  }

  private async findCategoryById(uuid: string): Promise<CategoryEntity | null> {
    return await this.categoryRepository.findOne({
      where: { id: uuid },
    });
  }

  private async findCategoryByName(
    name: Categories,
  ): Promise<CategoryEntity | null> {
    return await this.categoryRepository.findOne({
      where: { name: name },
    });
  }
}

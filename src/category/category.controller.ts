import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { ResponseDTO } from './dtos/Response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }

  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<ResponseDTO> {
    return await this.categoryService.create(data);
  }
}

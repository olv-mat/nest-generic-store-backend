import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { ResponseDTO } from './dtos/Response.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<CategoryEntity> {
    return await this.categoryService.findOne(uuid);
  }

  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<ResponseDTO> {
    return await this.categoryService.create(data);
  }
}

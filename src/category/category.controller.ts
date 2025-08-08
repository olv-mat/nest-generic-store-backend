import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dtos/CreateCategory.dto';
import { ResponseDTO } from './dtos/Response.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAll();
  }

  @Get(':uuid')
  public async findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<CategoryEntity> {
    return await this.categoryService.findOne(uuid);
  }

  @Post()
  public async create(@Body() dto: CategoryDTO): Promise<ResponseDTO> {
    return await this.categoryService.create(dto);
  }

  @Patch(':uuid')
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: CategoryDTO,
  ): Promise<ResponseDTO> {
    return await this.categoryService.update(uuid, dto);
  }

  @Delete(':uuid')
  public async delete(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<ResponseDTO> {
    return await this.categoryService.delete(uuid);
  }
}

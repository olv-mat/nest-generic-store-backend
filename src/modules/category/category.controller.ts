import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/Response.dto';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/Category.dto';
import { CategoryEntity } from './entities/category.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
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
  public async create(@Body() dto: CategoryDto): Promise<ResponseDto> {
    return await this.categoryService.create(dto);
  }

  @Put(':uuid')
  public async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() dto: CategoryDto,
  ): Promise<ResponseDto> {
    return await this.categoryService.update(uuid, dto);
  }

  @Delete(':uuid')
  public async delete(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
  ): Promise<ResponseDto> {
    return await this.categoryService.delete(uuid);
  }
}

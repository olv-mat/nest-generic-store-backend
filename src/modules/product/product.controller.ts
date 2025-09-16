import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/dtos/Response.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { UuidDto } from '../../common/dtos/Uuid.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDto): Promise<ProductEntity> {
    return await this.productService.findOne(uuid);
  }

  @Post()
  public async create(@Body() dto: CreateProductDto): Promise<ResponseDto> {
    return await this.productService.create(dto);
  }

  @Patch(':uuid')
  public async update(
    @Param() { uuid }: UuidDto,
    @Body() dto: UpdateProductDto,
  ): Promise<ResponseDto> {
    return await this.productService.update(uuid, dto);
  }

  @Delete(':uuid')
  public async delete(@Param() { uuid }: UuidDto): Promise<ResponseDto> {
    return await this.productService.delete(uuid);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { UuidDTO } from './dtos/Uuid.dto';
import { create } from 'domain';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ResponseDTO } from 'src/common/dtos/Response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDTO): Promise<ProductEntity> {
    return await this.productService.findOne(uuid);
  }

  @Post()
  public async create(@Body() dto: CreateProductDto): Promise<ResponseDTO> {
    return await this.productService.create(dto);
  }
}

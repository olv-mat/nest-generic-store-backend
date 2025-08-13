import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { UuidDTO } from './dtos/Uuid.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  @Get(':uuid')
  public async findOne(@Param() { uuid }: UuidDTO) {
    return await this.productService.findOne(uuid);
  }
}

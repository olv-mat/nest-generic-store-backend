import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponseDTO } from 'src/common/dtos/Response.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { UuidDTO } from '../../common/dtos/Uuid.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

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

  @Patch(':uuid')
  public async update(
    @Param() { uuid }: UuidDTO,
    @Body() dto: UpdateProductDto,
  ): Promise<ResponseDTO> {
    return await this.productService.update(uuid, dto);
  }

  @Delete(':uuid')
  public async delete(@Param() { uuid }: UuidDTO): Promise<ResponseDTO> {
    return await this.productService.delete(uuid);
  }
}

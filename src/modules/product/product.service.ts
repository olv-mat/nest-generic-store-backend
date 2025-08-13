import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  public async findOne(uuid: string): Promise<ProductEntity> {
    return await this.findProductById(uuid);
  }

  private async findProductById(uuid: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: uuid },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}

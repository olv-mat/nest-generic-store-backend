import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { In, Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';

@ValidatorConstraint({ async: true })
@Injectable()
export class ProductsExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async validate(products: string[]): Promise<boolean> {
    const validUuids = products.filter((id) => isUuid(id));
    if (validUuids.length !== products.length) {
      return false;
    }
    const uniqueUuids = [...new Set(validUuids)];
    const productCount = await this.productRepository.count({
      where: { id: In(uniqueUuids) },
    });
    return productCount === uniqueUuids.length;
  }
}

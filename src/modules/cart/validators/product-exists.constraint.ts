import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';

@ValidatorConstraint({ async: true })
@Injectable()
export class ProductExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async validate(uuid: string): Promise<boolean> {
    if (!isUuid(uuid)) {
      return false;
    }
    return await this.productRepository.exists({ where: { id: uuid } });
  }
}

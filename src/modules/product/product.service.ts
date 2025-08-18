import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ResponseMapper } from 'src/common/mappers/response.mapper';
import { ResponseDTO } from 'src/common/dtos/Response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  public async findOne(uuid: string): Promise<ProductEntity> {
    return await this.findProductById(uuid);
  }

  public async create(dto: CreateProductDto): Promise<ResponseDTO> {
    await this.checkProductExists(dto.product);
    const product = await this.productRepository.save(dto);
    return this.responseMapper.toResponse(
      product.id,
      'Product created successfully',
    );
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

  private async checkProductExists(name: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { product: name },
    });
    if (product) {
      throw new ConflictException('Product already exists');
    }
  }
}

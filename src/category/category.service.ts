import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dtos/CreateCategory.dto';
import { ResponseDTO } from './dtos/Response.dto';
import { CategoryEntity } from './entities/category.entity';
import { ResponseMapper } from './mappers/response.mapper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly responseMapper: ResponseMapper,
  ) {}

  public async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  public async findOne(uuid: string): Promise<CategoryEntity> {
    return await this.findCategoryById(uuid);
  }

  public async create(dto: CategoryDTO): Promise<ResponseDTO> {
    await this.checkCategoryExists(dto.category);
    const category = await this.categoryRepository.save(dto);
    return this.responseMapper.toResponse(
      category.id,
      'Category created sucessfully',
    );
  }

  public async update(uuid: string, dto: CategoryDTO): Promise<ResponseDTO> {
    const category = await this.findCategoryById(uuid);
    await this.categoryRepository.update(uuid, dto);
    return this.responseMapper.toResponse(uuid, 'Category updated sucessfully');
  }

  public async delete(uuid: string): Promise<ResponseDTO> {
    const category = await this.findCategoryById(uuid);
    await this.categoryRepository.delete(uuid);
    return this.responseMapper.toResponse(uuid, 'Category deleted sucessfully');
  }

  private async findCategoryById(uuid: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: uuid },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  private async checkCategoryExists(name: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { category: name },
    });
    if (category) {
      throw new BadRequestException('Category already exists');
    }
  }
}

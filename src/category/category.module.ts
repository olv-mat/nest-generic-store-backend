import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

/*
nest generate resource <resource>
*/

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

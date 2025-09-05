import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateOrderItemDto } from '../dtos/CreateOrderItem.dto';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueProductConstraint implements ValidatorConstraintInterface {
  public async validate(items: CreateOrderItemDto[]): Promise<boolean> {
    if (!Array.isArray(items)) return false;
    const productIds = items.map((i) => i.product);
    const uniqueIds = new Set(productIds);
    return uniqueIds.size === productIds.length;
  }
}

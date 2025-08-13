import { IsUUID } from 'class-validator';

export class UuidDTO {
  @IsUUID()
  uuid: string;
}

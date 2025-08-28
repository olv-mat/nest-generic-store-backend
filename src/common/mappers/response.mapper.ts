import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../dtos/Response.dto';

@Injectable()
export class ResponseMapper {
  public toResponse(uuid: string, message: string): ResponseDto {
    return new ResponseDto(uuid, message);
  }
}

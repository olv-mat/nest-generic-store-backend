import { Injectable } from '@nestjs/common';
import { ResponseDTO } from '../dtos/Response.dto';

@Injectable()
export class ResponseMapper {
  public toResponse(uuid: string, message: string): ResponseDTO {
    return new ResponseDTO(uuid, message);
  }
}

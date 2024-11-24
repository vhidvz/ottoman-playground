import { Injectable } from '@nestjs/common';

@Injectable()
export class NormService {
  getHello(): string {
    return 'Hello World!';
  }
}

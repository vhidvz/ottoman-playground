import { Injectable } from '@nestjs/common';

@Injectable()
export class TimesService {
  getHello(): string {
    return 'Hello World!';
  }
}

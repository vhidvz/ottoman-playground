import { Controller, Get } from '@nestjs/common';

import { TimesService } from './times.service';

@Controller()
export class TimesController {
  constructor(private readonly timeService: TimesService) {}

  @Get()
  getHello(): string {
    return this.timeService.getHello();
  }
}

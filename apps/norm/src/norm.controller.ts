import { Controller, Get } from '@nestjs/common';

import { NormService } from './norm.service';

@Controller()
export class NormController {
  constructor(private readonly normService: NormService) {}

  @Get()
  getHello(): string {
    return this.normService.getHello();
  }
}

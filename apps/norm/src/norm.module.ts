import { Module } from '@nestjs/common';

import { NormService } from './norm.service';
import { NormController } from './norm.controller';

@Module({
  imports: [],
  controllers: [NormController],
  providers: [NormService],
})
export class NormModule {}

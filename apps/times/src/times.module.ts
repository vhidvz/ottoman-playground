import { Module } from '@nestjs/common';

import { TimesService } from './times.service';
import { TimesController } from './times.controller';

@Module({
  imports: [],
  controllers: [TimesController],
  providers: [TimesService],
})
export class TimesModule {}

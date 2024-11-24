import { OttomanModule } from '@app/sdk/ottoman';
import { COUCH_CONFIG } from '@app/common/envs';
import { Module } from '@nestjs/common';

import { NormSchema } from './norm.schema';
import { NormService } from './norm.service';
import { NormRepository } from './norm.repository';
import { NormController } from './norm.controller';

@Module({
  imports: [OttomanModule.forRoot('app', COUCH_CONFIG()), OttomanModule.forFeature([{ name: 'norm', schema: NormSchema }])],
  controllers: [NormController],
  providers: [NormService, NormRepository],
  exports: [NormService],
})
export class NormModule {}

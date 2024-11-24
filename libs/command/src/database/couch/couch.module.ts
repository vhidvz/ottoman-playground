import { DynamicModule, Module } from '@nestjs/common';
import { COUCH_CONFIG } from '@app/common/envs';
import { HttpModule } from '@nestjs/axios';

import { COUCH_OPTIONS } from './couch.const';
import { CouchService } from './couch.service';

@Module({})
export class CouchModule {
  static register(options: ReturnType<typeof COUCH_CONFIG>): DynamicModule {
    const port = +process.env.COUCH_PORT || 8091;
    const base = +process.env.COUCH_BASE || 'http://localhost';

    const baseURL = `${base}:${port}`;

    return {
      module: CouchModule,
      imports: [HttpModule.register({ baseURL })],
      providers: [
        {
          provide: COUCH_OPTIONS,
          useValue: options,
        },
        CouchService,
      ],
      exports: [CouchService],
    };
  }
}

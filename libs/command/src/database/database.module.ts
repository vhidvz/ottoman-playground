import { COUCH_CONFIG } from '@app/common/envs';
import { Module } from '@nestjs/common';

import { CouchModule } from './couch';
import { DatabaseService } from './database.service';

@Module({
  imports: [CouchModule.register(COUCH_CONFIG())],
  providers: [DatabaseService],
})
export class DatabaseModule {}

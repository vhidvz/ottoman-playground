/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
require('log-node')();

import { NestFactory } from '@nestjs/core';

import { TimesModule } from './times.module';

async function bootstrap() {
  const app = await NestFactory.create(TimesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

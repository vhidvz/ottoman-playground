/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
require('log-node')();

import { NestFactory } from '@nestjs/core';

import { NormModule } from './norm.module';

async function bootstrap() {
  const app = await NestFactory.create(NormModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

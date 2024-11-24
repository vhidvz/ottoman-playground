/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
require('log-node')();

import { setupSwagger } from '@app/common/utils';
import { NestFactory } from '@nestjs/core';

import { NormModule } from './norm.module';

async function bootstrap() {
  const app = await NestFactory.create(NormModule);

  setupSwagger(app);

  await app.listen(process.env.port ?? 3000);

  const url = await app.getUrl();
  console.log(`Swagger UI is running on: ${url}/api`);
}
bootstrap();

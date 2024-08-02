import { configureNestJsMicroservice } from '@app/shared/projectConfig/config';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AuthModule);
  configureNestJsMicroservice(app);
  app.startAllMicroservices();
}

bootstrap();

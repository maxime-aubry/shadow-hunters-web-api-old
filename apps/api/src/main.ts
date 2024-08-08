import { configureNestJsMicroservice, configureSwagger } from '@app/shared/projectConfig/config';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);

  configureNestJsMicroservice(app);
  configureSwagger(app, {
    title: 'Shadow Hunters API',
    description: 'The Shadow Hunters API description',
    version: '1.0',
    path: 'api',
  });
  app.enableCors();

  await app.listen(5000);
}
bootstrap();

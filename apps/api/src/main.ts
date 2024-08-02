import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configureSwagger } from '@app/shared/projectConfig/config';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
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

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  configureSwagger(app);
  await app.listen(5000);
}

const configureSwagger = (app: INestApplication<any>): void => {
  const config = new DocumentBuilder()
    .setTitle('Shadow Hunters Web API')
    .setDescription('Web API for a fabulous game')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

bootstrap();

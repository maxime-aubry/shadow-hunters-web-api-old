import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  configureSwagger(app);
  await app.listen(5000, 'localhost', () => {
    console.log('listen on 5000');
    process.exit(0);
  });
}

const configureSwagger = (app: INestApplication<any>): void => {
  const config = new DocumentBuilder()
    .setTitle('Shadow Hunters Web API')
    .setDescription('Web API for a fabulous game')
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

bootstrap();

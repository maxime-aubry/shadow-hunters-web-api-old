import { configureMessageQueueListener, configureSwagger } from '@app/shared/projectConfig/config';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { IMessageQueueConfig } from '../../../libs/shared/src/config/environment-config/messageQueueConfig.interface';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AuthModule);

  addApiListener(app);
  configureSwagger(app, {
    title: 'Shadow Hunters Auth API',
    description: 'The Shadow Hunters Auth API description',
    version: '1.0',
    path: 'api',
  });

  app.startAllMicroservices();
}

const addApiListener = (app: INestApplication<any>): void => {
  const messageQueueConfig: IMessageQueueConfig = app.get('IMessageQueueConfig');
  const queue: string = messageQueueConfig.getMessageQueueAuthQueue();
  configureMessageQueueListener(app, queue);
};

bootstrap();

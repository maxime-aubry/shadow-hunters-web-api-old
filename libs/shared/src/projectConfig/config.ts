import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, type OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { IMessageQueueService } from '../interfaces/services/messageQueue/messageQueue.service.interface';
import { LoggerService } from '../services/logger/logger.service';
import { AllExceptionFilter } from './filter/exception.filter';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

export const configureNestJsMicroservice = (app: INestApplication<any>): void => {
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());
};

export const configureSwagger = (
  app: INestApplication<any>,
  settings: {
    title: string;
    description: string;
    version: string;
    path: string;
  },
): void => {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(settings.title)
    .setDescription(settings.description)
    .setVersion(settings.version)
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(settings.path, app, document);
};

export const configureMessageQueueListener = (app: INestApplication<any>, queue: string): void => {
  const messageQueueService: IMessageQueueService = app.get('IMessageQueueService');
  app.connectMicroservice(messageQueueService.getMessageQueueOptions(queue));
};

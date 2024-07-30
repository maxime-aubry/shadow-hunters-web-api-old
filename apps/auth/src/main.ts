import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AuthModule);

  // const configService: ConfigService = app.get(ConfigService);
  // const sharedService: SharedService = app.get(SharedService);

  // const queue: string | undefined = configService.get<string>('RABBITMQ_AUTH_QUEUE');

  // if (queue) {
  //   console.log('connectMicroservice');
  //   app.connectMicroservice(sharedService.getRmqOptions(queue));
  // }

  app.startAllMicroservices();
}

bootstrap();

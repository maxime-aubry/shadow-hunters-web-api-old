import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AuthModule);
  configureRabbitMQ(app);
  app.startAllMicroservices();
}

const configureRabbitMQ = (app: INestApplication<any>): void => {
  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);
  const USER: string = configService.get('RABBITMQ_USER');
  const PASSWORD: string = configService.get('RABBITMQ_PASS');
  const HOST: string = configService.get('RABBITMQ_HOST');
  const QUEUE: string = configService.get('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      }
    },
  });
};

bootstrap();

import type { IMessageQueueConfig } from '@app/shared/config/environment-config/messageQueueConfig.interface';
import { type DynamicModule, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [EnvironmentConfigModule, LoggerModule],
  exports: [LoggerModule],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (rabbitMqConfig: IMessageQueueConfig) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${rabbitMqConfig.getMessageQueueUser()}:${rabbitMqConfig.getMessageQueuePass()}@${rabbitMqConfig.getMessageQueueHost()}`,
              ],
              queue,
              queueOptions: {
                durable: true, // queue survives broker restart
              },
            },
          });
        },
        inject: [EnvironmentConfigService],
      },
    ];

    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}

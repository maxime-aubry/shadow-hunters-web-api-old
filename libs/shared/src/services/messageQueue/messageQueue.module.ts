import type { IMessageQueueConfig } from '@app/shared/config/environment-config/messageQueueConfig.interface';
import { type DynamicModule, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { LoggerModule } from '../logger/logger.module';
import { MessageQueueService } from './messageQueue.service';

@Module({
  imports: [EnvironmentConfigModule, LoggerModule],
  providers: [
    {
      provide: 'IMessageQueueService',
      useClass: MessageQueueService,
    },
  ],
  exports: [LoggerModule, 'IMessageQueueService'],
})
export class MessageQueueModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (messageQueueConfig: IMessageQueueConfig) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${messageQueueConfig.getMessageQueueUser()}:${messageQueueConfig.getMessageQueuePass()}@${messageQueueConfig.getMessageQueueHost()}`,
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
      module: MessageQueueModule,
      providers,
      exports: providers,
    };
  }
}

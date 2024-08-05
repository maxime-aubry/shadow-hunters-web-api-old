import { type DynamicModule, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import type { IRabbitMQConfig } from 'apps/auth/src/domain/adapters/config/rabbitMqConfig.interface';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { EnvironmentConfigService } from './config/environment-config/environment-config.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [EnvironmentConfigModule, LoggerModule],
  exports: [LoggerModule],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (raabitMqConfig: IRabbitMQConfig) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [
                `amqp://${raabitMqConfig.getRabbitMqUser()}:${raabitMqConfig.getRabbitMqPass()}@${raabitMqConfig.getRabbitMqHost()}`,
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

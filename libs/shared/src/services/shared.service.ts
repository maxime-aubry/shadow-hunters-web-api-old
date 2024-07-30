import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type RmqContext, type RmqOptions, Transport } from '@nestjs/microservices';
import { SharedServiceException } from '../exceptions/shared-service-exception';
import type { ISharedService } from './shared-service.interface';

@Injectable()
export class SharedService implements ISharedService {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  public getRmqOptions(queue: string): RmqOptions {
    const user: string | undefined = this.configService.get<string>('RABBITMQ_USER');
    const password: string | undefined = this.configService.get<string>('RABBITMQ_PASS');
    const host: string | undefined = this.configService.get<string>('RABBITMQ_HOST');

    if (!user) throw new SharedServiceException('RABBITMQ_USER is not found.');
    if (!password) throw new SharedServiceException('RABBITMQ_PASS is not found.');
    if (!host) throw new SharedServiceException('RABBITMQ_HOST is not found.');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        noAck: false,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  public acknowledgeMessage(context: RmqContext): void {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}

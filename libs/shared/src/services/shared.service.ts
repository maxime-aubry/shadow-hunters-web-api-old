import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { type RmqContext, type RmqOptions, Transport } from '@nestjs/microservices';
import type { SharedServiceInterface } from './shared.service.interface';

@Injectable()
export class SharedService implements SharedServiceInterface {
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public getRmqOptions(queue: string): RmqOptions {
    const user: string = this.configService.get('RABBITMQ_USER') as string;
    const password: string = this.configService.get('RABBITMQ_PASS') as string;
    const host: string = this.configService.get('RABBITMQ_HOST') as string;

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

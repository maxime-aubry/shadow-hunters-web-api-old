import type { IMessageQueueConfig } from '@app/shared/config/environment-config/messageQueueConfig.interface';
import type { IMessageQueueService } from '@app/shared/interfaces/services/messageQueue/messageQueue.service.interface';
import { Injectable } from '@nestjs/common';
import { type RmqContext, type RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class MessageQueueService implements IMessageQueueService {
  constructor(private readonly rabbitMqConfig: IMessageQueueConfig) {}

  public getMessageQueueOptions(queue: string): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${this.rabbitMqConfig.getMessageQueueUser()}:${this.rabbitMqConfig.getMessageQueuePass()}@${this.rabbitMqConfig.getMessageQueueHost()}`,
        ],
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

import type { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface IMessageQueueService {
  getMessageQueueOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}

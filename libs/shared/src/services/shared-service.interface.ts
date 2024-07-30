import type { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface ISharedService {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}

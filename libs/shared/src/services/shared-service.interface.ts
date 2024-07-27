import type { RmqContext, RmqOptions } from '@nestjs/microservices';

// biome-ignore lint/style/useNamingConvention: ISharedService
export interface ISharedService {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}

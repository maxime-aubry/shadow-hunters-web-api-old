import { MessageQueueModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { LocalAuthController } from './application/controllers/localAuth/localAuth.controller';

@Module({
  imports: [MessageQueueModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE ?? '')],
  controllers: [LocalAuthController],
})
export class AppModule {}

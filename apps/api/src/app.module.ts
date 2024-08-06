import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { LocalAuthController } from './application/controllers/localAuth/localAuth.controller';

@Module({
  imports: [SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE ?? '')],
  controllers: [LocalAuthController],
})
export class AppModule {}

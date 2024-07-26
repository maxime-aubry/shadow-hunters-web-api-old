import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE ?? '')],
  controllers: [AppController],
})
export class AppModule {}

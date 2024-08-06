import { EnvironmentConfigModule, MessageQueueModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthControllersModule } from './presentation/authControllers.module';

@Module({
  imports: [AuthControllersModule, EnvironmentConfigModule, MessageQueueModule],
  providers: [],
})
export class AuthModule {}

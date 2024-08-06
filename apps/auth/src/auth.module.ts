import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthControllersModule } from './presentation/authControllers.module';

@Module({
  imports: [AuthControllersModule, SharedModule],
  providers: [],
})
export class AuthModule {}

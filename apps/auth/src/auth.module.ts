import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthControllersModule } from './application/controllers/controllers.module';

@Module({
  imports: [AuthControllersModule, SharedModule],
  providers: [],
})
export class AuthModule {}

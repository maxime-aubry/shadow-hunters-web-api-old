import { Module } from '@nestjs/common';
import { AuthControllersModule } from './application/controllers/controllers.module';

@Module({
  imports: [AuthControllersModule],
  providers: [],
})
export class AuthModule {}

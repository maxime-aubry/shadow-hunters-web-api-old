import { Module } from '@nestjs/common';
import { LocalAuthController } from './localAuth.controller';

@Module({
  imports: [],
  controllers: [LocalAuthController],
})
export class AppModule {}

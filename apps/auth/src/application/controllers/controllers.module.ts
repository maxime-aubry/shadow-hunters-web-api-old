import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../../domain/useCases/auth-usecases-proxy.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthUseCasesModule],
  controllers: [AuthController],
})
export class ControllersModule {}

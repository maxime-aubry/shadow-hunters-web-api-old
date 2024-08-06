import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../domain/useCases/authUsecases.module';
import { LocalAuthController } from './controllers/localAuth/localAuth.controller';

@Module({
  imports: [AuthUseCasesModule],
  controllers: [LocalAuthController],
})
export class AuthControllersModule {}

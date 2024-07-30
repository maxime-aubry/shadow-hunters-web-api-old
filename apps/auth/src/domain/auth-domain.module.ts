import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from './useCases/auth-usecases.module';

@Module({
  imports: [AuthUseCasesModule],
})
export class AuthDomainModule {}

import { EnvironmentConfigModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from 'apps/auth/src/domain/useCases/auth-usecases.module';

@Module({
  imports: [EnvironmentConfigModule, AuthUseCasesModule],
})
export class GoogleAuthControllerModule {}

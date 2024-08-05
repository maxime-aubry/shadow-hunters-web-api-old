import { EnvironmentConfigModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../../domain/useCases/auth-usecases.module';
import { AuthGuardsModule } from '../../infrastructure/guards/auth-guard.module';
import { GoogleAuthController } from './googleAuth/google-auth.controller';
import { LocalAuthController } from './localAuth/local-auth.controller';

@Module({
  imports: [AuthGuardsModule, AuthUseCasesModule, EnvironmentConfigModule],
  controllers: [GoogleAuthController, LocalAuthController],
})
export class AuthControllersModule {}

import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../../domain/useCases/auth-usecases.module';
import { EnvironmentConfigModule } from '../../infrastructure/config/environment-config/environment-config.module';
import { AuthGuardsModule } from '../../infrastructure/guards/auth-guard.module';
import { GoogleAuthController } from './googleAuth/google-auth.controller';
import { LocalAuthController } from './localAuth/local-auth.controller';

@Module({
  imports: [AuthGuardsModule, AuthUseCasesModule, EnvironmentConfigModule],
  controllers: [GoogleAuthController, LocalAuthController],
})
export class AuthControllersModule {}

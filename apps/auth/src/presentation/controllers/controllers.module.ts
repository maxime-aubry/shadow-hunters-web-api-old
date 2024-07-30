import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../../domain/useCases/auth-usecases.module';
import { AuthGuardsModule } from '../../infrastructure/guards/auth-guard.module';
import { FacebookAuthController } from './facebookAuth/facebook-auth.controller';
import { GoogleAuthController } from './googleAuth/google-auth.controller';
import { LocalAuthController } from './localAuth/local-auth.controller';

@Module({
  imports: [AuthGuardsModule, AuthUseCasesModule],
  controllers: [FacebookAuthController, GoogleAuthController, LocalAuthController],
})
export class ControllersModule {}

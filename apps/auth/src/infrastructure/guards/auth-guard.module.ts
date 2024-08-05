import { EnvironmentConfigModule, SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../../domain/useCases/auth-usecases.module';
import { JwtAuthGuard } from './jwtAuthGuard/jwt-auth.guard';
import { JwtAuthStrategy } from './jwtAuthGuard/jwt-auth.strategy';
import { LocalAuthGuard } from './localAuthGuard/local-auth.guard';
import { LocalAuthStrategy } from './localAuthGuard/local-auth.strategy';
import { GoogleOauthGuard } from './oauth/googleOauthGuard/google-oauth.guard';
import { GoogleOauthStrategy } from './oauth/googleOauthGuard/google-oauth.strategy';

@Module({
  imports: [SharedModule, EnvironmentConfigModule, AuthUseCasesModule],
  providers: [JwtAuthGuard, JwtAuthStrategy, LocalAuthGuard, LocalAuthStrategy, GoogleOauthGuard, GoogleOauthStrategy],
  exports: [JwtAuthGuard, JwtAuthStrategy, LocalAuthGuard, LocalAuthStrategy, GoogleOauthGuard, GoogleOauthStrategy],
})
export class AuthGuardsModule {}

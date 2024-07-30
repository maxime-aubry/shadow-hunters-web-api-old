import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../../domain/useCases/auth-usecases.module';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { JwtAuthGuard } from './jwtAuthGuard/jwt-auth.guard';
import { JwtAuthStrategy } from './jwtAuthGuard/jwt-auth.strategy';
import { LocalAuthGuard } from './localAuthGuard/local-auth.guard';
import { LocalAuthStrategy } from './localAuthGuard/local-auth.strategy';
import { FacebookAuthGuard } from './oauth/facebookOauthGuard/facebook-oauth.guard';
import { FacebookStrategy } from './oauth/facebookOauthGuard/facebook-oauth.strategy';
import { GoogleOauthGuard } from './oauth/googleOauthGuard/google-oauth.guard';
import { GoogleOauthStrategy } from './oauth/googleOauthGuard/google-oauth.strategy';

@Module({
  imports: [EnvironmentConfigModule, AuthUseCasesModule],
  providers: [
    JwtAuthGuard,
    JwtAuthStrategy,
    LocalAuthGuard,
    LocalAuthStrategy,
    FacebookAuthGuard,
    FacebookStrategy,
    GoogleOauthGuard,
    GoogleOauthStrategy,
  ],
  exports: [
    JwtAuthGuard,
    JwtAuthStrategy,
    LocalAuthGuard,
    LocalAuthStrategy,
    FacebookAuthGuard,
    FacebookStrategy,
    GoogleOauthGuard,
    GoogleOauthStrategy,
  ],
})
export class AuthGuardsModule {}

import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'apps/auth/src/infrastructure/config/environment-config/environment-config.module';
import { AuthRepositoriesModule } from 'apps/auth/src/infrastructure/database/repositories/repositories.module';
import { LoggerModule } from 'apps/auth/src/infrastructure/logger/logger.module';
import { BcryptModule } from 'apps/auth/src/infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from '../../infrastructure/services/jwt/jwt.module';
import { AuthMappersModule } from '../mappers/auth-mappers.module';
import { CommonAuthUseCasesImpl } from './common/common-auth-usecases';
import { LocalAuthUseCasesImpl } from './localAuth/local-auth-usecases';
import { OAuthUseCasesImpl } from './oAuth/oauth-usecases';

@Module({
  imports: [AuthMappersModule, AuthRepositoriesModule, BcryptModule, EnvironmentConfigModule, JwtModule, LoggerModule],
  providers: [
    {
      provide: 'ICommonAuthUseCases',
      useClass: CommonAuthUseCasesImpl,
    },
    {
      provide: 'ILocalAuthUseCases',
      useClass: LocalAuthUseCasesImpl,
    },
    {
      provide: 'IOAuthUseCases',
      useClass: OAuthUseCasesImpl,
    },
  ],
  exports: [CommonAuthUseCasesImpl, LocalAuthUseCasesImpl, OAuthUseCasesImpl],
})
export class AuthUseCasesModule {}

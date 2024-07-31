import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../infrastructure/config/environment-config/environment-config.module';
import { AuthRepositoriesModule } from '../../infrastructure/database/auth-repositories.module';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { AuthMappersModule } from '../../infrastructure/mappers/auth-mappers.module';
import { BcryptModule } from '../../infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from '../../infrastructure/services/jwt/jwt.module';
import { CommonAuthUseCasesImpl } from './common/common-auth-usecases';
import { LocalAuthUseCasesImpl } from './localAuth/local-auth-usecases';
import { OAuthUseCasesImpl } from './oauth/oauth-usecases';

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
  exports: ['ICommonAuthUseCases', 'ILocalAuthUseCases', 'IOAuthUseCases'],
})
export class AuthUseCasesModule {}

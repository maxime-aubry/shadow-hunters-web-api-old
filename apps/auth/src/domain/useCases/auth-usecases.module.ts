import { LoggerModule } from '@app/shared/logger/logger.module';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../infrastructure/config/environment-config/environment-config.module';
import { AuthRepositoriesModule } from '../../infrastructure/database/auth-repositories.module';
import { AuthMappersModule } from '../../infrastructure/mappers/auth-mappers.module';
import { HashModule } from '../../infrastructure/services/hash/hash.module';
import { JwtModule } from '../../infrastructure/services/jwt/jwt.module';
import { CommonAuthUseCasesImpl } from './common/common-auth-usecases';
import { LocalAuthUseCasesImpl } from './localAuth/local-auth-usecases';
import { OAuthUseCasesImpl } from './oAuth/oauth-usecases';

@Module({
  imports: [AuthMappersModule, AuthRepositoriesModule, EnvironmentConfigModule, HashModule, JwtModule, LoggerModule],
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

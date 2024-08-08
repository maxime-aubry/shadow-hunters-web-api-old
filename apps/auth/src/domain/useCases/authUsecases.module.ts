import { EnvironmentConfigModule } from '@app/shared';
import { LoggerModule } from '@app/shared/services/logger/logger.module';
import { Module } from '@nestjs/common';
import { AuthPresentersModule } from '../../application/presenters/authPresenters.module';
import { AuthRepositoriesModule } from '../../infrastructure/database/auth-repositories.module';
import { AuthMappersModule } from '../../infrastructure/mappers/authMappers.module';
import { HashModule } from '../../infrastructure/services/hash/hash.module';
import { JwtModule } from '../../infrastructure/services/jwt/jwt.module';
import { CommonAuthUseCasesImpl } from './common/commonAuthUsecases';
import { LocalAuthUseCasesImpl } from './localAuth/localAuthUseCases';
import { OAuthUseCasesImpl } from './oAuth/oauthUseCases';

@Module({
  imports: [
    AuthMappersModule,
    AuthPresentersModule,
    AuthRepositoriesModule,
    EnvironmentConfigModule,
    HashModule,
    JwtModule,
    LoggerModule,
  ],
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

import { Module } from '@nestjs/common';
import { AuthInfrastructureModule } from '../../infrastructure/auth-infrastructure.module';
import { CommonAuthUseCasesImpl } from './common/common-auth-usecases';
import { LocalAuthUseCasesImpl } from './localAuth/local-auth-usecases';
import { OAuthUseCasesImpl } from './oAuth/oauth-usecases';

@Module({
  imports: [AuthInfrastructureModule],
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

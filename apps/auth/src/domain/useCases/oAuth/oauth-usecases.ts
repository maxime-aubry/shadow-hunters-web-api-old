import { Inject, Injectable } from '@nestjs/common';
import type { IJwtConfig } from '../../adapters/config/jwt-config.interface';
import type { IJwtTokenService } from '../../adapters/services/jwt/jwt-token-service.interface';
import type { IOAuthUseCases } from '../../ports/in/usecases/oauth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { SignInForOauthStrategyUseCaseImpl } from './signIn/sign-in.impl';
import type { ISignInForOauthStrategyUseCase } from './signIn/sign-in.interface';

@Injectable()
export class OAuthUseCasesImpl implements IOAuthUseCases {
  public readonly signIn: ISignInForOauthStrategyUseCase;

  constructor(
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfig,
    @Inject('IJwtService') private readonly jwtService: IJwtTokenService,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
  ) {
    this.signIn = new SignInForOauthStrategyUseCaseImpl(this.jwtConfig, this.jwtService, this.userRepository);
  }
}

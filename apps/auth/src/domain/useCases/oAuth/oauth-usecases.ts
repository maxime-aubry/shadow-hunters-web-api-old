import { Inject, Injectable } from '@nestjs/common';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IHashService } from '../../adapters/services/hash/hash.interface';
import type { IJwtRefreshTokenGenerator } from '../../adapters/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../adapters/services/jwt/jwt-token-generator.interface';
import type { IOAuthUseCases } from '../../ports/in/usecases/oauth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { SignInForOauthStrategyUseCaseImpl } from './signIn/sign-in.impl';
import type { ISignInForOauthStrategyUseCase } from './signIn/sign-in.interface';
import { ValidateUserForOauthStrategyUseCase } from './validateUser/validate-user.impl';
import type { IValidateUserForOauthStrategyUseCase } from './validateUser/validate-user.interface';

@Injectable()
export class OAuthUseCasesImpl implements IOAuthUseCases {
  public readonly signIn: ISignInForOauthStrategyUseCase;
  public readonly validateUser: IValidateUserForOauthStrategyUseCase;

  constructor(
    @Inject('IAuthMappersService') private readonly authMappersService: IAuthMappersService,
    @Inject('IHashService') private readonly hashService: IHashService,
    @Inject('IJwtTokenGenerator') private readonly jwtTokenGenerator: IJwtTokenGenerator,
    @Inject('IJwtRefreshTokenGenerator') private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
  ) {
    this.signIn = new SignInForOauthStrategyUseCaseImpl(
      authMappersService,
      hashService,
      jwtTokenGenerator,
      jwtRefreshTokenGenerator,
      userRepository,
    );
    this.validateUser = new ValidateUserForOauthStrategyUseCase(
      this.authMappersService,
      this.hashService,
      this.userRepository,
    );
  }
}

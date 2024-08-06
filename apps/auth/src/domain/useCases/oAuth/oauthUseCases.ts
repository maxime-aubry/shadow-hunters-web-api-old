import { Inject, Injectable } from '@nestjs/common';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { IUsersRepository } from '../../../infrastructure/database/repositories/user-repository.interface';
import type { IHashService } from '../../../infrastructure/services/hash/hash.interface';
import type { IJwtRefreshTokenGenerator } from '../../../infrastructure/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../../infrastructure/services/jwt/jwt-token-generator.interface';
import type { IOAuthUseCases } from './oauthUseCases.interface';
import { SignInForOauthStrategyUseCaseImpl } from './signIn/signIn.impl';
import type { ISignInForOauthStrategyUseCase } from './signIn/signIn.interface';
import { ValidateUserForOauthStrategyUseCase } from './validateUser/validateUser.impl';
import type { IValidateUserForOauthStrategyUseCase } from './validateUser/validateUser.interface';

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

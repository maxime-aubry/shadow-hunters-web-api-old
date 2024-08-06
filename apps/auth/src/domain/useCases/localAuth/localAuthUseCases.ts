import { Inject, Injectable } from '@nestjs/common';
import type { ILocalAuthPresenters } from 'apps/auth/src/application/presenters/localAuth/localAuthPresenters.interface';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { IUsersRepository } from '../../../infrastructure/database/repositories/user-repository.interface';
import type { IHashService } from '../../../infrastructure/services/hash/hash.interface';
import type { IJwtRefreshTokenGenerator } from '../../../infrastructure/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../../infrastructure/services/jwt/jwt-token-generator.interface';
import type { ILocalAuthUseCases } from './localAuthUseCases.interface';
import { SignInForLocalStrategyUseCaseImpl } from './signIn/signIn.impl';
import type { ISignInForLocalStrategyUseCase } from './signIn/signIn.interface';
import { SignUpForLocalStrategyUseCaseImpl } from './signUp/signUp.impl';
import type { ISignUpForLocalStrategyUseCase } from './signUp/signUp.interface';
import { ValidateUserForLocalStrategyUseCase } from './validateUser/validateUser.impl';
import type { IValidateUserForLocalStrategyUseCase } from './validateUser/validateUser.interface';

@Injectable()
export class LocalAuthUseCasesImpl implements ILocalAuthUseCases {
  public readonly signUp: ISignUpForLocalStrategyUseCase;
  public readonly signIn: ISignInForLocalStrategyUseCase;
  public readonly validateUser: IValidateUserForLocalStrategyUseCase;

  constructor(
    @Inject('IAuthMappersService') private readonly authMappersService: IAuthMappersService,
    @Inject('IHashService') private readonly hashService: IHashService,
    @Inject('IJwtTokenGenerator') private readonly jwtTokenGenerator: IJwtTokenGenerator,
    @Inject('IJwtRefreshTokenGenerator') private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
    @Inject('ILocalAuthPresenters') private readonly localAuthPresenters: ILocalAuthPresenters,
  ) {
    this.signUp = new SignUpForLocalStrategyUseCaseImpl(authMappersService, hashService, userRepository);
    this.signIn = new SignInForLocalStrategyUseCaseImpl(
      authMappersService,
      hashService,
      jwtTokenGenerator,
      jwtRefreshTokenGenerator,
      userRepository,
      localAuthPresenters,
    );
    this.validateUser = new ValidateUserForLocalStrategyUseCase(authMappersService, hashService, userRepository);
  }
}

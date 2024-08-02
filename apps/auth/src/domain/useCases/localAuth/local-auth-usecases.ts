import { Inject, Injectable } from '@nestjs/common';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../adapters/services/bcrypt/bcrypt.interface';
import type { IJwtRefreshTokenGenerator } from '../../adapters/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../adapters/services/jwt/jwt-token-generator.interface';
import type { ILocalAuthUseCases } from '../../ports/in/usecases/local-auth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { SignInForLocalStrategyUseCaseImpl } from './signIn/sign-in.impl';
import type { ISignInForLocalStrategyUseCase } from './signIn/sign-in.interface';
import { SignUpForLocalStrategyUseCaseImpl } from './signUp/sign-up.impl';
import type { ISignUpForLocalStrategyUseCase } from './signUp/sign-up.interface';
import { ValidateUserForLocalStrategyUseCase } from './validateUser/validate-user.impl';
import type { IValidateUserForLocalStrategyUseCase } from './validateUser/validate-user.interface';

@Injectable()
export class LocalAuthUseCasesImpl implements ILocalAuthUseCases {
  public readonly signUp: ISignUpForLocalStrategyUseCase;
  public readonly signIn: ISignInForLocalStrategyUseCase;
  public readonly validateUser: IValidateUserForLocalStrategyUseCase;

  constructor(
    @Inject('IAuthMappersService') private readonly authMappersService: IAuthMappersService,
    @Inject('IBcryptService') private readonly bcryptService: IBcryptService,
    @Inject('IJwtTokenGenerator') private readonly jwtTokenGenerator: IJwtTokenGenerator,
    @Inject('IJwtRefreshTokenGenerator') private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
  ) {
    this.signUp = new SignUpForLocalStrategyUseCaseImpl(authMappersService, bcryptService, userRepository);
    this.signIn = new SignInForLocalStrategyUseCaseImpl(
      authMappersService,
      bcryptService,
      jwtTokenGenerator,
      jwtRefreshTokenGenerator,
      userRepository,
    );
    this.validateUser = new ValidateUserForLocalStrategyUseCase(authMappersService, bcryptService, userRepository);
  }
}

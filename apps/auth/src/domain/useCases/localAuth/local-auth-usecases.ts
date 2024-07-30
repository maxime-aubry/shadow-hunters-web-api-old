import { Inject, Injectable } from '@nestjs/common';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../adapters/services/bcrypt/bcrypt.interface';
import type { ILocalAuthUseCases } from '../../ports/in/usecases/local-auth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { SignUpForLocalStrategyUseCaseImpl } from './signUp/sign-up.impl';
import type { ISignUpForLocalStrategyUseCase } from './signUp/sign-up.interface';
import { ValidateUserForLocalStrategyUseCaseImpl } from './validateUser/validate-user.impl';
import type { IValidateUserForLocalStrategyUseCase } from './validateUser/validate-user.interface';

@Injectable()
export class LocalAuthUseCasesImpl implements ILocalAuthUseCases {
  public readonly signUp: ISignUpForLocalStrategyUseCase;
  public readonly validateUser: IValidateUserForLocalStrategyUseCase;

  constructor(
    @Inject('IAuthMappersService') private readonly authMappersService: IAuthMappersService,
    @Inject('IBcryptService') private readonly bcryptService: IBcryptService,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
  ) {
    this.signUp = new SignUpForLocalStrategyUseCaseImpl(authMappersService, bcryptService, userRepository);
    this.validateUser = new ValidateUserForLocalStrategyUseCaseImpl(authMappersService, bcryptService, userRepository);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user-repository.impl';
import { BcryptService } from 'apps/auth/src/infrastructure/services/bcrypt/bcrypt.service';
import type { IBcryptService } from '../../adapters/bcrypt.interface';
import { AuthMappersServiceImpl } from '../../mappers/auth-mappers-service.impl';
import type { IAuthMappersService } from '../../mappers/auth-mappers-service.interface';
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
    @Inject(AuthMappersServiceImpl) private readonly authMappersService: IAuthMappersService,
    @Inject(BcryptService) private readonly bcryptService: IBcryptService,
    @Inject(DatabaseUserRepository) private readonly userRepository: IUsersRepository,
  ) {
    this.signUp = new SignUpForLocalStrategyUseCaseImpl(authMappersService, bcryptService, userRepository);
    this.validateUser = new ValidateUserForLocalStrategyUseCaseImpl(authMappersService, bcryptService, userRepository);
  }
}

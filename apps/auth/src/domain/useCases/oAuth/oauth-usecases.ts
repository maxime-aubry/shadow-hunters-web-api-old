import { Inject, Injectable } from '@nestjs/common';
import type { IJwtConfig } from '../../adapters/config/jwt-config.interface';
import type { IJwtService } from '../../adapters/services/jwt/jwt-service.interface';
import type { IOAuthUseCases } from '../../ports/in/usecases/oauth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { SignInUseCaseImpl } from './signIn/sign-in.impl';
import type { ISignInUseCase } from './signIn/sign-in.interface';

@Injectable()
export class OAuthUseCasesImpl implements IOAuthUseCases {
  public readonly signIn: ISignInUseCase;

  constructor(
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfig,
    @Inject('IJwtService') private readonly jwtService: IJwtService,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
  ) {
    this.signIn = new SignInUseCaseImpl(this.jwtConfig, this.jwtService, this.userRepository);
  }
}

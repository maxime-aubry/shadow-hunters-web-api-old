import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from 'apps/auth/src/infrastructure/config/environment-config/environment-config.service';
import { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user-repository.impl';
import { JwtTokenService } from 'apps/auth/src/infrastructure/services/jwt/jwt.service';
import type { IJWTConfig } from '../../adapters/config/jwt-config.interface';
import type { IJwtService } from '../../adapters/jwt.interface';
import type { IOAuthUseCases } from '../../ports/in/usecases/oauth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { SignInUseCaseImpl } from './signIn/sign-in.impl';
import type { ISignInUseCase } from './signIn/sign-in.interface';

@Injectable()
export class OAuthUseCasesImpl implements IOAuthUseCases {
  public readonly signIn: ISignInUseCase;

  constructor(
    @Inject(EnvironmentConfigService) private readonly jwtConfig: IJWTConfig,
    @Inject(JwtTokenService) private readonly jwtService: IJwtService,
    @Inject(DatabaseUserRepository) private readonly userRepository: IUsersRepository,

    //JwtTokenService
  ) {
    this.signIn = new SignInUseCaseImpl(this.jwtConfig, this.jwtService, this.userRepository);
  }
}

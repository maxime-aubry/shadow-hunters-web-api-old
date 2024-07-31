import { Inject, Injectable } from '@nestjs/common';
import type { IBcryptService } from '../../adapters/services/bcrypt/bcrypt.interface';
import type { IJwtRefreshTokenGenerator } from '../../adapters/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../adapters/services/jwt/jwt-token-generator.interface';
import type { ICommonAuthUseCases } from '../../ports/in/usecases/common-auth-use-cases.interface';
import type { IUsersRepository } from '../../ports/out/repositories/user-repository.interface';
import { AllocateTokensUseCase } from './allocateTokens/allocate-tokens.impl';
import type { IAllocateTokensUseCase } from './allocateTokens/allocate-tokens.interface';
import { LogOutUseCase } from './logOut/log-out.impl';
import type { ILogOutUseCase } from './logOut/log-out.interface';

@Injectable()
export class CommonAuthUseCasesImpl implements ICommonAuthUseCases {
  public readonly allocateTokens: IAllocateTokensUseCase;
  public readonly logOut: ILogOutUseCase;

  constructor(
    @Inject('IBcryptService') private readonly bcryptService: IBcryptService,
    @Inject('IJwtTokenGenerator') private readonly jwtTokenGenerator: IJwtTokenGenerator,
    @Inject('IJwtRefreshTokenGenerator') private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
  ) {
    this.allocateTokens = new AllocateTokensUseCase(
      this.bcryptService,
      this.jwtTokenGenerator,
      this.jwtRefreshTokenGenerator,
      this.userRepository,
    );
    this.logOut = new LogOutUseCase();
  }
}

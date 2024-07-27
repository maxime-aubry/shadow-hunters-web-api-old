import { Inject, Injectable } from '@nestjs/common';
import type { DoesPasswordMatchUseCase } from './doesPasswordMatch/usecase';
import type { GetCookieWithJwtRefreshTokenUseCase } from './getCookieWithJwtRefreshToken/usecase';
import type { GetUserIfRefreshTokenMatchesUseCase } from './getUserIfRefreshTokenMatches/usecase';
import type { IsAuthenticatedUseCase } from './isAuthenticated/usecase';
import type { LogOutUseCase } from './logOut/usecase';
import type { RegisterUserUseCase } from './registerUser/usecase';
import type { ValidateUserForLocalStrategyUseCase } from './validateUserForLocalStrategy/usecase';

@Injectable()
export class AuthUseCasesCollection {
  constructor(
    @Inject() public readonly doesPasswordMatchUseCase: DoesPasswordMatchUseCase,
    @Inject() public readonly getCookieWithJwtRefreshTokenUseCase: GetCookieWithJwtRefreshTokenUseCase,
    @Inject() public readonly getUserIfRefreshTokenMatchesUseCase: GetUserIfRefreshTokenMatchesUseCase,
    @Inject() public readonly isAuthenticatedUseCase: IsAuthenticatedUseCase,
    @Inject() public readonly logOutUseCase: LogOutUseCase,
    @Inject() public readonly registerUser: RegisterUserUseCase,
    @Inject() public readonly validateUserForLocalStrategyUseCase: ValidateUserForLocalStrategyUseCase,
  ) {}
}

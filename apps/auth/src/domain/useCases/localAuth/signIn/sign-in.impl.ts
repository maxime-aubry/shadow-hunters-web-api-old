import { UserEntity } from '@app/shared';
import { UnauthorizedException } from '@nestjs/common';
import type { LocalCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../../adapters/services/bcrypt/bcrypt.interface';
import type { IJwtRefreshTokenGenerator } from '../../../adapters/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../../adapters/services/jwt/jwt-token-generator.interface';
import { User } from '../../../models/user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { SignInForLocalStrategyUseCaseRequest } from './request';
import { SignInForLocalStrategyUseCaseResponse } from './response';
import type { ISignInForLocalStrategyUseCase } from './sign-in.interface';

export class SignInForLocalStrategyUseCaseImpl implements ISignInForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly bcryptService: IBcryptService,
    private readonly jwtTokenGenerator: IJwtTokenGenerator,
    private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: SignInForLocalStrategyUseCaseRequest,
  ): Promise<SignInForLocalStrategyUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmailOrUsernameAsync(
      request.usernameOrEmail,
    );

    if (!existingUser) throw new UnauthorizedException('Account not found!');

    await this.checkCredentials(existingUser, request.password);
    const { accessTokenCookie, refreshToken, refreshTokenCookie } = this.getAuthenticationElements(existingUser);
    await this.updateUser(existingUser, refreshToken);

    return new SignInForLocalStrategyUseCaseResponse(
      this.authMappersService.mapper.map(existingUser, UserEntity, User),
      accessTokenCookie,
      refreshTokenCookie,
    );
  }

  private async checkCredentials(existingUser: UserEntity, clearedPassword: string): Promise<void> {
    const credentials: LocalCredentials = existingUser.credentials as LocalCredentials;
    const doesPasswordMatch: boolean = await this.bcryptService.compareAsync(clearedPassword, credentials.password);

    if (!doesPasswordMatch) throw new UnauthorizedException('Password does not match!');
  }

  private getAuthenticationElements(existingUser: UserEntity): {
    accessTokenCookie: string;
    refreshToken: string;
    refreshTokenCookie: string;
  } {
    const user: User = this.authMappersService.mapper.map(existingUser, UserEntity, User);
    const token: string = this.jwtTokenGenerator.generateToken(user);
    const accessTokenCookie: string = this.jwtTokenGenerator.generateCookieWithToken(token);
    const refreshToken: string = this.jwtRefreshTokenGenerator.generateToken(user);
    const refreshTokenCookie: string = this.jwtRefreshTokenGenerator.generateCookieWithToken(refreshToken);

    return {
      accessTokenCookie,
      refreshToken,
      refreshTokenCookie,
    };
  }

  private async updateUser(existingUser: UserEntity, refreshToken: string): Promise<void> {
    const hashedRefreshToken: string = await this.bcryptService.hashAsync(refreshToken);
    await this.userRepository.updateRefreshTokenAsync(existingUser, hashedRefreshToken);
  }
}

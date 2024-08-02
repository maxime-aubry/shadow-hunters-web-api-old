import { UserEntity } from '@app/shared';
import { OAuthCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../../adapters/services/bcrypt/bcrypt.interface';
import type { IJwtRefreshTokenGenerator } from '../../../adapters/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../../adapters/services/jwt/jwt-token-generator.interface';
import { User } from '../../../models/user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { SignInForOauthStrategyUseCaseRequest } from './request';
import { SignInForOauthStrategyUseCaseResponse } from './response';
import type { ISignInForOauthStrategyUseCase } from './sign-in.interface';

export class SignInForOauthStrategyUseCaseImpl implements ISignInForOauthStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly bcryptService: IBcryptService,
    private readonly jwtTokenGenerator: IJwtTokenGenerator,
    private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: SignInForOauthStrategyUseCaseRequest,
  ): Promise<SignInForOauthStrategyUseCaseResponse> {
    let userEntity: UserEntity | null = await this.userRepository.getUserByEmailAsync(request.email);

    if (!userEntity) {
      const credentials: OAuthCredentials = new OAuthCredentials(request.provider, request.providerId);
      const newUser: UserEntity = new UserEntity(
        '',
        request.firstname,
        request.lastname,
        request.username,
        request.email,
        credentials,
      );
      userEntity = await this.userRepository.createAsync(newUser);
    }

    const { accessTokenCookie, refreshToken, refreshTokenCookie } = this.getAuthenticationElements(userEntity);
    await this.updateUser(userEntity, refreshToken);

    return new SignInForOauthStrategyUseCaseResponse(
      this.authMappersService.mapper.map(userEntity, UserEntity, User),
      accessTokenCookie,
      refreshTokenCookie,
    );
  }

  private getAuthenticationElements(userEntity: UserEntity): {
    accessTokenCookie: string;
    refreshToken: string;
    refreshTokenCookie: string;
  } {
    const user: User = this.authMappersService.mapper.map(userEntity, UserEntity, User);
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

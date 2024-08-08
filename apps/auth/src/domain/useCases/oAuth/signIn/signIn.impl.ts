import { UserEntity } from '@app/shared';
import { OAuthCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IUsersRepository } from '../../../../infrastructure/database/repositories/user-repository.interface';
import type { IHashService } from '../../../../infrastructure/services/hash/hash.interface';
import type { IJwtRefreshTokenGenerator } from '../../../../infrastructure/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../../../infrastructure/services/jwt/jwt-token-generator.interface';
import { LocalUserModel } from '../../../models/localUser.model';
import type { SignInForOauthStrategyUseCaseRequest } from './request';
import { SignInForOauthStrategyUseCaseResponse } from './response';
import type { ISignInForOauthStrategyUseCase } from './signIn.interface';

export class SignInForOauthStrategyUseCaseImpl implements ISignInForOauthStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly hashService: IHashService,
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
      this.authMappersService.mapper.map(userEntity, UserEntity, LocalUserModel),
      accessTokenCookie,
      refreshTokenCookie,
    );
  }

  private getAuthenticationElements(userEntity: UserEntity): {
    accessTokenCookie: string;
    refreshToken: string;
    refreshTokenCookie: string;
  } {
    const user: LocalUserModel = this.authMappersService.mapper.map(userEntity, UserEntity, LocalUserModel);
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
    const hashedRefreshToken: string = await this.hashService.hashAsync(refreshToken);
    await this.userRepository.updateRefreshTokenAsync(existingUser, hashedRefreshToken);
  }
}

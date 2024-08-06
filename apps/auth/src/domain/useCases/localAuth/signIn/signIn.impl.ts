import { UserEntity } from '@app/shared';
import { UnauthorizedException } from '@nestjs/common';
import type { LocalAuthSignInUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignInUser.dto';
import type { LocalAuthSignedInUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignedInUser.dto';
import type { ILocalAuthPresenters } from 'apps/auth/src/application/presenters/localAuth/localAuthPresenters.interface';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { IUsersRepository } from '../../../../infrastructure/database/repositories/user-repository.interface';
import type { IHashService } from '../../../../infrastructure/services/hash/hash.interface';
import type { IJwtRefreshTokenGenerator } from '../../../../infrastructure/services/jwt/jwt-refresh-token-generator.interface';
import type { IJwtTokenGenerator } from '../../../../infrastructure/services/jwt/jwt-token-generator.interface';
import { LocalUserModel } from '../../../models/localUser.model';
import type { ISignInForLocalStrategyUseCase } from './signIn.interface';

export class SignInForLocalStrategyUseCaseImpl implements ISignInForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly hashService: IHashService,
    private readonly jwtTokenGenerator: IJwtTokenGenerator,
    private readonly jwtRefreshTokenGenerator: IJwtRefreshTokenGenerator,
    private readonly userRepository: IUsersRepository,
    private readonly localAuthPresenters: ILocalAuthPresenters,
  ) {}

  public async executeAsync(request: LocalAuthSignInUserDto): Promise<LocalAuthSignedInUserDto> {
    const existingUserEntity: UserEntity | null = await this.userRepository.getUserByEmailOrUsernameAsync(
      request.usernameOrEmail,
    );

    if (!existingUserEntity) throw new UnauthorizedException('Account not found!');

    const existingUserModel: LocalUserModel = this.authMappersService.mapper.map(
      existingUserEntity,
      UserEntity,
      LocalUserModel,
    );
    await this.checkCredentials(existingUserModel, request.password);
    await this.signInUser(existingUserModel);

    return this.localAuthPresenters.signInPresenter.getOutput(existingUserModel);
  }

  private async checkCredentials(existingUserModel: LocalUserModel, clearedPassword: string): Promise<void> {
    const doesPasswordMatch: boolean = await this.hashService.compareAsync(clearedPassword, existingUserModel.password);

    if (!doesPasswordMatch) throw new UnauthorizedException('Password does not match!');
  }

  private async signInUser(existingUserModel: LocalUserModel): Promise<void> {
    const { accessTokenCookie, refreshToken, refreshTokenCookie } = this.getAuthenticationElements(existingUserModel);
    const userToUpdateEntity: UserEntity = this.authMappersService.mapper.map(
      existingUserModel,
      LocalUserModel,
      UserEntity,
    );
    const hashedRefreshToken: string = await this.hashService.hashAsync(refreshToken);
    await this.userRepository.updateRefreshTokenAsync(userToUpdateEntity, hashedRefreshToken);
    await this.userRepository.updateLastLoginAsync(userToUpdateEntity);

    existingUserModel.accessTokenCookie = accessTokenCookie;
    existingUserModel.refreshTokenCookie = refreshTokenCookie;
  }

  private getAuthenticationElements(existingUserModel: LocalUserModel): {
    accessTokenCookie: string;
    refreshToken: string;
    refreshTokenCookie: string;
  } {
    const token: string = this.jwtTokenGenerator.generateToken(existingUserModel);
    const accessTokenCookie: string = this.jwtTokenGenerator.generateCookieWithToken(token);
    const refreshToken: string = this.jwtRefreshTokenGenerator.generateToken(existingUserModel);
    const refreshTokenCookie: string = this.jwtRefreshTokenGenerator.generateCookieWithToken(refreshToken);

    return {
      accessTokenCookie,
      refreshToken,
      refreshTokenCookie,
    };
  }
}

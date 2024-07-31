import { UserEntity } from '@app/shared';
import { OAuthCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import { OAuthUser } from '../../../models/oauth-user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { SignInForOauthStrategyUseCaseRequest } from './request';
import { SignInForOauthStrategyUseCaseResponse } from './response';
import type { ISignInForOauthStrategyUseCase } from './sign-in.interface';

export class SignInForOauthStrategyUseCaseImpl implements ISignInForOauthStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: SignInForOauthStrategyUseCaseRequest,
  ): Promise<SignInForOauthStrategyUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmailAsync(request.email);

    if (!existingUser) {
      const credentials: OAuthCredentials = new OAuthCredentials(request.provider, request.providerId);
      const newUser: UserEntity = new UserEntity(
        '',
        request.firstname,
        request.lastname,
        request.username,
        request.email,
        credentials,
      );
      const savedUser: UserEntity = await this.userRepository.createAsync(newUser);
      return new SignInForOauthStrategyUseCaseResponse(
        this.authMappersService.mapper.map(savedUser, UserEntity, OAuthUser),
      );
    }

    return new SignInForOauthStrategyUseCaseResponse(
      this.authMappersService.mapper.map(existingUser, UserEntity, OAuthUser),
    );
  }
}

import { UserEntity } from '@app/shared';
import type { AuthProvider, OAuthCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IUsersRepository } from '../../../../infrastructure/database/repositories/user-repository.interface';
import type { IBcryptService } from '../../../adapters/services/bcrypt/bcrypt.interface';
import { UnauthorizedUserException } from '../../../exceptions/unauthorizedUser.exception';
import { LocalUserModel } from '../../../models/localUser.model';
import type { ValidateUserForOauthStrategyUseCaseRequest } from './request';
import { ValidateUserForOauthStrategyUseCaseResponse } from './response';
import type { IValidateUserForOauthStrategyUseCase } from './validateUser.interface';

export class ValidateUserForOauthStrategyUseCase implements IValidateUserForOauthStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: ValidateUserForOauthStrategyUseCaseRequest,
  ): Promise<ValidateUserForOauthStrategyUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmailAsync(request.email);

    if (!existingUser) throw new UnauthorizedUserException('UserNotFound');

    this.checkCredentials(existingUser, request.provider, request.providerId);
    await this.userRepository.updateLastLoginAsync(existingUser);

    const response: ValidateUserForOauthStrategyUseCaseResponse = new ValidateUserForOauthStrategyUseCaseResponse(
      this.authMappersService.mapper.map(existingUser, UserEntity, LocalUserModel),
    );
    return response;
  }

  private checkCredentials(user: UserEntity, provider: AuthProvider, providerId: string): void {
    const credentials: OAuthCredentials = user.credentials as OAuthCredentials;

    if (credentials.provider !== provider || credentials.providerId !== providerId)
      throw new UnauthorizedUserException('CredentialsDoNotMatche');
  }
}

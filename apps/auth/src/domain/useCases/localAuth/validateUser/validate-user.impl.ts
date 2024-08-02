import { UserEntity } from '@app/shared';
import type { LocalCredentials } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../../adapters/services/bcrypt/bcrypt.interface';
import { UnauthorizedUserException } from '../../../exceptions/unauthorized-user.exception';
import { User } from '../../../models/user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { ValidateUserForLocalStrategyUseCaseRequest } from './request';
import { ValidateUserForLocalStrategyUseCaseResponse } from './response';
import type { IValidateUserForLocalStrategyUseCase } from './validate-user.interface';

export class ValidateUserForLocalStrategyUseCase implements IValidateUserForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: ValidateUserForLocalStrategyUseCaseRequest,
  ): Promise<ValidateUserForLocalStrategyUseCaseResponse> {
    const existingUser: UserEntity | null = await this.userRepository.getUserByEmailOrUsernameAsync(
      request.emailOrUsername,
    );

    if (!existingUser) throw new UnauthorizedUserException('UserNotFound');

    await this.checkCredentials(existingUser, request.password);
    await this.userRepository.updateLastLoginAsync(existingUser);

    const response: ValidateUserForLocalStrategyUseCaseResponse = new ValidateUserForLocalStrategyUseCaseResponse(
      this.authMappersService.mapper.map(existingUser, UserEntity, User),
    );
    return response;
  }

  private async checkCredentials(existingUser: UserEntity, clearedPassword: string): Promise<void> {
    const credentials: LocalCredentials = existingUser.credentials as LocalCredentials;
    const doesPasswordMatch: boolean = await this.bcryptService.compareAsync(clearedPassword, credentials.password);

    if (!doesPasswordMatch) throw new UnauthorizedUserException('PasswordDoesNotMatch');
  }
}

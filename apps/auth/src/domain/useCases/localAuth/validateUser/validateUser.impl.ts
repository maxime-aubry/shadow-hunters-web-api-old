import { UserEntity } from '@app/shared';
import type { LocalAuthValidateUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthValidateUser.dto';
import type { LocalAuthValidatedUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthValidatedUser.dto';
import type { ILocalAuthPresenters } from 'apps/auth/src/application/presenters/localAuth/localAuthPresenters.interface';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { IHashService } from 'apps/auth/src/infrastructure/services/hash/hash.interface';
import type { IUsersRepository } from '../../../../infrastructure/database/repositories/user-repository.interface';
import { LocalUserModel } from '../../../models/localUser.model';
import type { IValidateUserForLocalStrategyUseCase } from './validateUser.interface';

export class ValidateUserForLocalStrategyUseCase implements IValidateUserForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly hashService: IHashService,
    private readonly userRepository: IUsersRepository,
    private readonly localAuthPresenters: ILocalAuthPresenters,
  ) {}

  public async executeAsync(request: LocalAuthValidateUserDto): Promise<LocalAuthValidatedUserDto | null> {
    const existingUserEntity: UserEntity | null = await this.userRepository.getUserByEmailOrUsernameAsync(
      request.emailOrUsername,
    );

    if (!existingUserEntity) return null;

    const existingUserModel: LocalUserModel = this.authMappersService.mapper.map(
      existingUserEntity,
      UserEntity,
      LocalUserModel,
    );
    const doesPasswordMatch: boolean = await this.checkCredentials(existingUserModel, request.password);

    if (!doesPasswordMatch) return null;

    return this.localAuthPresenters.validateUserPresenter.getOutput(existingUserModel);
  }

  private async checkCredentials(existingUser: LocalUserModel, clearedPassword: string): Promise<boolean> {
    const doesPasswordMatch: boolean = await this.hashService.compareAsync(clearedPassword, existingUser.password);
    return doesPasswordMatch;
  }
}

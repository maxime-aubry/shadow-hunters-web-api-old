import { UserEntity } from '@app/shared';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/auth-mappers-service.interface';
import type { IBcryptService } from '../../../adapters/services/bcrypt/bcrypt.interface';
import { User } from '../../../models/user.model';
import type { IUsersRepository } from '../../../ports/out/repositories/user-repository.interface';
import type { ValidateUserForLocalStrategyUseCaseRequest } from './request';
import { ValidateUserForLocalStrategyUseCaseResponse } from './response';
import type { IValidateUserForLocalStrategyUseCase } from './validate-user.interface';

export class ValidateUserForLocalStrategyUseCaseImpl implements IValidateUserForLocalStrategyUseCase {
  constructor(
    private readonly authMappersService: IAuthMappersService,
    private readonly bcryptService: IBcryptService,
    private readonly userRepository: IUsersRepository,
  ) {}

  public async executeAsync(
    request: ValidateUserForLocalStrategyUseCaseRequest,
  ): Promise<ValidateUserForLocalStrategyUseCaseResponse> {
    const hashedPassword: string = await this.bcryptService.hashAsync(request.password);
    const user: UserEntity | null = await this.userRepository.getUserByCredentials(request.username, hashedPassword);
    return this.generateResponse(user);
  }

  private generateResponse(user: UserEntity | null): ValidateUserForLocalStrategyUseCaseResponse {
    if (user) {
      const mappedUser: User | null = this.authMappersService.mapper.map(user, UserEntity, User);
      const response: ValidateUserForLocalStrategyUseCaseResponse = new ValidateUserForLocalStrategyUseCaseResponse(
        mappedUser,
      );
      return response;
    }

    return new ValidateUserForLocalStrategyUseCaseResponse(null);
  }
}

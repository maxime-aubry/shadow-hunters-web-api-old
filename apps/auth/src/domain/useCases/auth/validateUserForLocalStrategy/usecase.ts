import type { IUseCase } from '@app/shared';
import { Inject } from '@nestjs/common';
import type { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user.repository';
import type { ValidateUserForLocalStrategyUseCaseRequest } from './request.usecase';
import { ValidateUserForLocalStrategyUseCaseResponse } from './response.usecase';

export class ValidateUserForLocalStrategyUseCase
  implements IUseCase<ValidateUserForLocalStrategyUseCaseRequest, Promise<ValidateUserForLocalStrategyUseCaseResponse>>
{
  constructor(@Inject() private readonly userRepository: DatabaseUserRepository) {}

  public async execute(
    request: ValidateUserForLocalStrategyUseCaseRequest,
  ): Promise<ValidateUserForLocalStrategyUseCaseResponse> {
    const user: UserEntity | null = await this.userRepository.getUserByUsername(request.userName);
    const response: ValidateUserForLocalStrategyUseCaseResponse = new ValidateUserForLocalStrategyUseCaseResponse(user);
    return response;
  }
}

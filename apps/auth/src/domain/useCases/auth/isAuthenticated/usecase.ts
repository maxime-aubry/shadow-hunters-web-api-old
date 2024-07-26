import type { IUseCase } from '@app/shared';
import { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user.repository';
import { mapper } from 'apps/auth/src/infrastructure/mappers';
import { UserWithoutPassword } from '../../../models/userWithtoutPassword.model';
import type { IsAuthenticatedUseCaseRequest } from './request.usecase';
import { IsAuthenticatedUseCaseResponse } from './response.usecase';

export class IsAuthenticatedUseCase
  implements IUseCase<IsAuthenticatedUseCaseRequest, Promise<IsAuthenticatedUseCaseResponse>>
{
  constructor(private readonly userRepository: DatabaseUserRepository) {}

  public async execute(request: IsAuthenticatedUseCaseRequest): Promise<IsAuthenticatedUseCaseResponse> {
    const user: UserEntity | null = await this.userRepository.getUserByUsername(request.userName);
    const userWithoutPassword: UserWithoutPassword = mapper.map(user, UserEntity, UserWithoutPassword);
    const response: IsAuthenticatedUseCaseResponse = new IsAuthenticatedUseCaseResponse(userWithoutPassword);
    return response;
  }
}

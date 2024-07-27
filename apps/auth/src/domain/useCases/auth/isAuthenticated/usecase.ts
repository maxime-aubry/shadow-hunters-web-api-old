import type { IUseCase } from '@app/shared';
import { Inject } from '@nestjs/common';
import { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user.repository';
import type { AuthMapperService } from 'apps/auth/src/infrastructure/mappers/auth-mappers.service';
import { UserWithoutPassword } from '../../../models/userWithtoutPassword.model';
import type { IsAuthenticatedUseCaseRequest } from './request.usecase';
import { IsAuthenticatedUseCaseResponse } from './response.usecase';

export class IsAuthenticatedUseCase
  implements IUseCase<IsAuthenticatedUseCaseRequest, Promise<IsAuthenticatedUseCaseResponse>>
{
  constructor(
    @Inject() private readonly authMapperService: AuthMapperService,
    @Inject() private readonly userRepository: DatabaseUserRepository,
  ) {}

  public async execute(request: IsAuthenticatedUseCaseRequest): Promise<IsAuthenticatedUseCaseResponse> {
    const user: UserEntity | null = await this.userRepository.getUserByUsername(request.userName);
    const userWithoutPassword: UserWithoutPassword = this.authMapperService
      .getMapper()
      .map(user, UserEntity, UserWithoutPassword);
    const response: IsAuthenticatedUseCaseResponse = new IsAuthenticatedUseCaseResponse(userWithoutPassword);
    return response;
  }
}

import type { IUseCase } from '@app/shared';
import type { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user.repository';
import type { IBcryptService } from '../../../adapters/bcrypt.interface';
import { AuthUseCaseException } from '../../../exceptions/auth-usecase.exception';
import type { GetUserIfRefreshTokenMatchesUseCaseRequest } from './request.usecase';
import { GetUserIfRefreshTokenMatchesUseCaseResponse } from './response.usecase';

export class GetUserIfRefreshTokenMatchesUseCase
  implements IUseCase<GetUserIfRefreshTokenMatchesUseCaseRequest, Promise<GetUserIfRefreshTokenMatchesUseCaseResponse>>
{
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  public async execute(
    request: GetUserIfRefreshTokenMatchesUseCaseRequest,
  ): Promise<GetUserIfRefreshTokenMatchesUseCaseResponse> {
    const user: UserEntity | null = await this.userRepository.getUserByUsername(request.userName);

    if (!user) throw new AuthUseCaseException(`No user for username "${request.userName}" in database.`);

    const isRefreshTokenMatching: boolean = await this.bcryptService.compare(
      request.refreshToken,
      user.hashRefreshToken,
    );
    const response: GetUserIfRefreshTokenMatchesUseCaseResponse = new GetUserIfRefreshTokenMatchesUseCaseResponse(
      isRefreshTokenMatching ? user : null,
    );
    return response;
  }
}

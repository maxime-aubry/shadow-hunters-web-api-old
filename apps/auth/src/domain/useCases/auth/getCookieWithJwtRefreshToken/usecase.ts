import type { IUseCase } from '@app/shared';
import { Inject } from '@nestjs/common';
import type { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';
import type { DatabaseUserRepository } from 'apps/auth/src/infrastructure/database/repositories/user.repository';
import type { IBcryptService } from '../../../adapters/bcrypt.interface';
import type { IJwtService, IJwtServicePayload } from '../../../adapters/jwt.interface';
import type { JWTConfig } from '../../../config/jwt.interface';
import { AuthUseCaseException } from '../../../exceptions/auth-usecase.exception';
import type { ILogger } from '../../../logger/logger.interface';
import type { GetCookieWithJwtRefreshTokenUseCaseRequest } from './request.usecase';
import { GetCookieWithJwtRefreshTokenUseCaseResponse } from './response.usecase';

export class GetCookieWithJwtRefreshTokenUseCase
  implements IUseCase<GetCookieWithJwtRefreshTokenUseCaseRequest, Promise<GetCookieWithJwtRefreshTokenUseCaseResponse>>
{
  constructor(
    @Inject() private readonly bcryptService: IBcryptService,
    @Inject() private readonly jwtConfig: JWTConfig,
    @Inject() private readonly jwtTokenService: IJwtService,
    @Inject() private readonly logger: ILogger,
    @Inject() private readonly userRepository: DatabaseUserRepository,
  ) {}

  public async execute(
    request: GetCookieWithJwtRefreshTokenUseCaseRequest,
  ): Promise<GetCookieWithJwtRefreshTokenUseCaseResponse> {
    this.logger.log('LoginUseCases execute', `The user ${request.userName} have been logged.`);

    const payload: IJwtServicePayload = { username: request.userName };
    const secret: string = this.jwtConfig.getJwtRefreshSecret() ?? '';
    const expiresIn: string = `${this.jwtConfig.getJwtRefreshExpirationTime() ?? '0'}s`;
    const token: string = this.jwtTokenService.createToken(payload, secret, expiresIn);

    await this.setCurrentRefreshToken(request.userName, token);

    const response: GetCookieWithJwtRefreshTokenUseCaseResponse = new GetCookieWithJwtRefreshTokenUseCaseResponse(
      token,
      this.jwtConfig,
    );
    return response;
  }

  private async setCurrentRefreshToken(userName: string, refreshToken: string): Promise<void> {
    const user: UserEntity | null = await this.userRepository.getUserByUsername(userName);

    if (!user) throw new AuthUseCaseException(`No user for username "${userName}" in database.`);

    const currentHashedRefreshToken: string = await this.bcryptService.hash(refreshToken);
    await this.userRepository.updateRefreshToken(user, currentHashedRefreshToken);
  }
}

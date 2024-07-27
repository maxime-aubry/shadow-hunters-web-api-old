import type { IUseCase } from '@app/shared';
import { Inject } from '@nestjs/common';
import type { IJwtService, IJwtServicePayload } from '../../../adapters/jwt.interface';
import type { JWTConfig } from '../../../config/jwt.interface';
import type { ILogger } from '../../../logger/logger.interface';
import type { GetCookieWithJwtTokenUseCaseRequest } from './request.usecase';
import { GetCookieWithJwtTokenUseCaseResponse } from './response.usecase';

export class GetCookieWithJwtTokenUseCase
  implements IUseCase<GetCookieWithJwtTokenUseCaseRequest, GetCookieWithJwtTokenUseCaseResponse>
{
  constructor(
    @Inject() private readonly jwtConfig: JWTConfig,
    @Inject() private readonly jwtTokenService: IJwtService,
    @Inject() private readonly logger: ILogger,
  ) {}

  public execute(request: GetCookieWithJwtTokenUseCaseRequest): GetCookieWithJwtTokenUseCaseResponse {
    this.logger.log('LoginUseCases execute', `The user ${request.userName} have been logged.`);
    const payload: IJwtServicePayload = { username: request.userName };
    const secret: string = this.jwtConfig.getJwtSecret() ?? '';
    const expiresIn: string = `${this.jwtConfig.getJwtRefreshExpirationTime() ?? '0'}s`;
    const token: string = this.jwtTokenService.createToken(payload, secret, expiresIn);
    const response: GetCookieWithJwtTokenUseCaseResponse = new GetCookieWithJwtTokenUseCaseResponse(
      token,
      this.jwtConfig,
    );
    return response;
  }
}

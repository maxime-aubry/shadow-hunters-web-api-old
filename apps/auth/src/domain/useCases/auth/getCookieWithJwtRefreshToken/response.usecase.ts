import type { JWTConfig } from '../../../config/jwt.interface';

export class GetCookieWithJwtRefreshTokenUseCaseResponse {
  constructor(token: string, jwtConfig: JWTConfig) {
    this.cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${jwtConfig.getJwtRefreshExpirationTime()}`;
  }

  cookie: string;
}

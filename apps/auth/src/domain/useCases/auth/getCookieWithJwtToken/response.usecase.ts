import type { JWTConfig } from '../../../config/jwt.interface';

export class GetCookieWithJwtTokenUseCaseResponse {
  constructor(token: string, jwtConfig: JWTConfig) {
    this.cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConfig.getJwtExpirationTime()}`;
  }

  cookie: string;
}

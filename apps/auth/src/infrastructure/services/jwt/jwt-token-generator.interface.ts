import type { JwtTokenPayload } from '../../../domain/models/jwtTokenPayload';

export interface IJwtTokenGenerator {
  generateToken(payload: JwtTokenPayload): string;
  generateCookieWithToken(token: string): string;
}

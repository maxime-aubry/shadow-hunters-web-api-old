import type { JwtTokenPayload } from '../../../models/jwtTokenPayload';

export interface IJwtTokenGenerator {
  generateToken(payload: JwtTokenPayload): string;
  generateCookieWithToken(token: string): string;
}

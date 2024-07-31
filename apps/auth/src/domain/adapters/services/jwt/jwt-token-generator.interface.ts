import type { User } from '../../../models/user.model';

export interface IJwtTokenGenerator {
  generateToken(user: User): string;
  generateCookieWithToken(token: string): string;
}

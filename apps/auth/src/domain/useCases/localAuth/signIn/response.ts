import type { User } from '../../../models/user.model';

export class SignInForLocalStrategyUseCaseResponse {
  constructor(user: User, accessTokenCookie: string, refreshTokenCookie: string) {
    this.user = user;
    this.accessTokenCookie = accessTokenCookie;
    this.refreshTokenCookie = refreshTokenCookie;
  }

  public user: User;
  public accessTokenCookie: string;
  public refreshTokenCookie: string;
}

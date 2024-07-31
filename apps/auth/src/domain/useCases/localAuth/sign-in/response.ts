import type { LocalUser } from '../../../models/local-user.model';

export class SignInForLocalStrategyUseCaseResponse {
  constructor(user: LocalUser, accessTokenCookie: string, refreshTokenCookie: string) {
    this.user = user;
    this.accessTokenCookie = accessTokenCookie;
    this.refreshTokenCookie = refreshTokenCookie;
  }

  public user: LocalUser;
  public accessTokenCookie: string;
  public refreshTokenCookie: string;
}

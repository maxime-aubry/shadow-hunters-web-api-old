import type { LocalUserModel } from '../../../models/localUser.model';

export class SignInForOauthStrategyUseCaseResponse {
  constructor(user: LocalUserModel, accessTokenCookie: string, refreshTokenCookie: string) {
    this.user = user;
    this.accessTokenCookie = accessTokenCookie;
    this.refreshTokenCookie = refreshTokenCookie;
  }

  public user: LocalUserModel;
  public accessTokenCookie: string;
  public refreshTokenCookie: string;
}

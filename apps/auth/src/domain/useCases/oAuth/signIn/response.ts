import type { OAuthUser } from '../../../models/oauth-user.model';

export class SignInForOauthStrategyUseCaseResponse {
  constructor(user: OAuthUser) {
    this.user = user;
  }

  public user: OAuthUser;
}

import type { OAuthUser } from './oauth-user';

export class OauthRequest {
  constructor(user: OAuthUser) {
    this.user = user;
  }

  public user: OAuthUser;
}

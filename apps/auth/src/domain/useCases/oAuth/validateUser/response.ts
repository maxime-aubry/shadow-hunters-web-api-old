import type { LocalUserModel } from '../../../models/localUser.model';

export class ValidateUserForOauthStrategyUseCaseResponse {
  constructor(user: LocalUserModel) {
    this.user = user;
  }

  public user: LocalUserModel;
}

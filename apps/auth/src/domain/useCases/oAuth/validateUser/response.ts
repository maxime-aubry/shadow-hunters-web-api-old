import type { User } from '../../../models/user.model';

export class ValidateUserForOauthStrategyUseCaseResponse {
  constructor(user: User) {
    this.user = user;
  }

  public user: User;
}

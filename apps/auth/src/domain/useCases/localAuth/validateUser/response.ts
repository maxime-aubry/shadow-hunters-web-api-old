import type { User } from '../../../models/user.model';

export class ValidateUserForLocalStrategyUseCaseResponse {
  constructor(user: User) {
    this.user = user;
  }

  public user: User;
}

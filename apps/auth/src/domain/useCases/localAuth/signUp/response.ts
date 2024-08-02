import type { User } from '../../../models/user.model';

export class SignUpForLocalStrategyUseCaseResponse {
  constructor(user: User) {
    this.user = user;
  }

  public user: User;
}

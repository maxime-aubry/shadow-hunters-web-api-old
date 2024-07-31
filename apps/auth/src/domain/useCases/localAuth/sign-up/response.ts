import type { LocalUser } from '../../../models/local-user.model';

export class SignUpForLocalStrategyUseCaseResponse {
  constructor(user: LocalUser) {
    this.user = user;
  }

  public user: LocalUser;
}

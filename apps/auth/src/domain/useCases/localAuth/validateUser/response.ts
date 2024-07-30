import type { User } from '../../../models/user.model';

export class ValidateUserForLocalStrategyUseCaseResponse {
  constructor(user: User | null) {
    this.user = user;
  }

  user: User | null;
}

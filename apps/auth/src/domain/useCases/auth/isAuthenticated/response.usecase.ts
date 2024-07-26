import type { UserWithoutPassword } from '../../../models/userWithtoutPassword.model';

export class IsAuthenticatedUseCaseResponse {
  constructor(user: UserWithoutPassword) {
    this.user = user;
  }

  public user: UserWithoutPassword;
}

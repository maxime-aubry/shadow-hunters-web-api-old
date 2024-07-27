import type { UserWithoutPassword } from '../../../models/userWithtoutPassword.model';

export class RegisterUserUseCaseResponse {
  constructor(user: UserWithoutPassword) {
    this.user = user;
  }

  public user: UserWithoutPassword;
}

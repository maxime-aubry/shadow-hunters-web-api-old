import type { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';

export class ValidateUserForLocalStrategyUseCaseResponse {
  constructor(user: UserEntity | null) {
    this.user = user;
  }

  user: UserEntity | null;
}

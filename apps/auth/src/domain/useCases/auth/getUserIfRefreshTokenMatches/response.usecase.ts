import type { UserEntity } from 'apps/auth/src/infrastructure/database/entities/user.entity';

export class GetUserIfRefreshTokenMatchesUseCaseResponse {
  constructor(user: UserEntity | null) {
    this.user = user;
  }

  public user: UserEntity | null;
}

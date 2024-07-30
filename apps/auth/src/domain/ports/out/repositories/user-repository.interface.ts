import type { IDatabaseRepository } from '@app/shared';
import type { UserEntity } from '../../../../infrastructure/database/entities/user.entity';

export interface IUsersRepository extends IDatabaseRepository<UserEntity> {
  getUserByEmail(email: string): Promise<UserEntity | null>;
  getUserByUserName(username: string): Promise<UserEntity | null>;
  getUserByCredentials(username: string, password: string): Promise<UserEntity | null>;
  updateRefreshToken(user: UserEntity, refreshToken: string): Promise<void>;
}

import type { IDatabaseRepository } from '@app/shared';
import type { UserEntity } from '../../infrastructure/database/entities/user.entity';

// biome-ignore lint/style/useNamingConvention: IUsersRepository
export interface IUsersRepository extends IDatabaseRepository<UserEntity> {
  getUserByUsername(username: string): Promise<UserEntity | null>;
  updateRefreshToken(user: UserEntity, refreshToken: string): Promise<void>;
}

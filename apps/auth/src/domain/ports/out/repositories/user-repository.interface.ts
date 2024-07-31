import type { DeepPartial } from 'typeorm';
import type { UserEntity } from '../../../../infrastructure/database/entities/user.entity';

export interface IUsersRepository {
  createAsync(user: DeepPartial<UserEntity>): Promise<UserEntity>;
  getUserByEmailAsync(email: string): Promise<UserEntity | null>;
  getUserByEmailOrUsernameAsync(emailOrUsername: string): Promise<UserEntity | null>;
  updateLastLoginAsync(user: UserEntity): Promise<void>;
  updateRefreshTokenAsync(user: UserEntity, refreshToken: string): Promise<void>;
}

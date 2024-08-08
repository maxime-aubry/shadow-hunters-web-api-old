import { DatabaseRepository } from '@app/shared';
import { Injectable } from '@nestjs/common';
import type { IUsersRepository } from 'apps/auth/src/domain/ports/out/repositories/user-repository.interface';
import type { DeepPartial, FindOptionsWhere } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import type { UserEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository extends DatabaseRepository<UserEntity> implements IUsersRepository {
  public async createAsync(user: DeepPartial<UserEntity>): Promise<UserEntity> {
    const createdUser: UserEntity = this.entity.create(user);
    return await this.entity.save(createdUser);
  }

  public async getUserByEmailAsync(email: string): Promise<UserEntity | null> {
    const filter: FindOptionsWhere<UserEntity> = {
      email,
    };
    return await this.entity.findOneBy(filter);
  }

  public async getUserByEmailOrUsernameAsync(emailOrUsername: string): Promise<UserEntity | null> {
    return await this.entity
      .createQueryBuilder('user')
      .where('user.email = :emailOrUsername', { emailOrUsername })
      .orWhere('user.username = :emailOrUsername', { emailOrUsername })
      .getOne();
  }

  public async updateLastLoginAsync(user: UserEntity): Promise<void> {
    const filter: FindOptionsWhere<UserEntity> = {
      id: user.id,
    };
    const query: QueryDeepPartialEntity<UserEntity> = { lastLogin: () => 'CURRENT_TIMESTAMP' };
    await this.entity.update(filter, query);
  }

  public async updateRefreshTokenAsync(user: UserEntity, refreshToken: string): Promise<void> {
    const filter: FindOptionsWhere<UserEntity> = {
      id: user.id,
    };
    const query: QueryDeepPartialEntity<UserEntity> = { hashRefreshToken: () => refreshToken };
    await this.entity.update(filter, query);
  }
}

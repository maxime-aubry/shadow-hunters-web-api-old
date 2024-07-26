import { DatabaseRepository } from '@app/shared';
import { Injectable } from '@nestjs/common';
import type { IUsersRepository } from 'apps/auth/src/domain/repositories/user.repository';
import type { FindOneOptions, FindOptionsWhere } from 'typeorm';
import type { UserEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository extends DatabaseRepository<UserEntity> implements IUsersRepository {
  public async getUserByUsername(userName: string): Promise<UserEntity | null> {
    const filter: FindOneOptions<UserEntity> = {
      where: {
        userName,
      } as FindOptionsWhere<UserEntity>,
    };
    return await this.findByCondition(filter);
  }

  public async updateRefreshToken(user: UserEntity, refreshToken: string): Promise<void> {
    user.hashRefreshToken = refreshToken;
    await this.save(user);
  }
}

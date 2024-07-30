import { DatabaseRepository } from '@app/shared';
import { Injectable } from '@nestjs/common';
import type { IUsersRepository } from 'apps/auth/src/domain/ports/out/repositories/user-repository.interface';
import type { FindOneOptions, FindOptionsWhere } from 'typeorm';
import type { UserEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository extends DatabaseRepository<UserEntity> implements IUsersRepository {
  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const filter: FindOneOptions<UserEntity> = {
      where: {
        email,
      } as FindOptionsWhere<UserEntity>,
    };
    return await this.findByCondition(filter);
  }

  public async getUserByUserName(username: string): Promise<UserEntity | null> {
    const filter: FindOneOptions<UserEntity> = {
      where: {
        username,
      } as FindOptionsWhere<UserEntity>,
    };
    return await this.findByCondition(filter);
  }

  public async getUserByCredentials(username: string, password: string): Promise<UserEntity | null> {
    const filter: FindOneOptions<UserEntity> = {
      where: {
        username,
        password,
      } as FindOptionsWhere<UserEntity>,
    };
    return await this.findByCondition(filter);
  }

  public async updateRefreshToken(user: UserEntity, refreshToken: string): Promise<void> {
    user.hashRefreshToken = refreshToken;
    await this.save(user);
  }
}

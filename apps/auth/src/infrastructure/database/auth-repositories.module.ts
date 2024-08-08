import { UserEntity } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { DatabaseUserRepository } from './repositories/user-repository.impl';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: DatabaseUserRepository,
    },
  ],
  exports: ['IUsersRepository'],
})
export class AuthRepositoriesModule {}

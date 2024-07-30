import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { UserEntity } from '../entities/user.entity';
import { DatabaseUserRepository } from './user-repository.impl';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class AuthRepositoriesModule {}

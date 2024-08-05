import { EnvironmentConfigModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { IDatabaseConfig } from 'apps/auth/src/domain/adapters/config/database-config.interface';

export const getTypeOrmModuleOptions = (config: IDatabaseConfig): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [`${__dirname}./../../**/*.entity{.ts,.js}`],
    synchronize: false,
    schema: process.env.DATABASE_SCHEMA,
    migrationsRun: true,
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/migrations',
    },
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: ['IDatabaseConfig'],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}

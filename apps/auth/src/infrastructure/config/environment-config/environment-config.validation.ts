import type { ValidationError } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  constructor(
    nodeEnv: Environment,
    jwtSecret: string,
    jwtExpirationTime: string,
    jwtRefreshTokenSecret: string,
    jwtRefreshTokenExpirationTime: string,
    databaseHost: string,
    databasePort: number,
    databaseUser: string,
    databasePassword: string,
    databaseName: string,
    databaseSchema: string,
    databaseSynchronize: boolean,
  ) {
    this.NODE_ENV = nodeEnv;
    this.JWT_SECRET = jwtSecret;
    this.JWT_EXPIRATION_TIME = jwtExpirationTime;
    this.JWT_REFRESH_TOKEN_SECRET = jwtRefreshTokenSecret;
    this.JWT_REFRESH_TOKEN_EXPIRATION_TIME = jwtRefreshTokenExpirationTime;
    this.DATABASE_HOST = databaseHost;
    this.DATABASE_PORT = databasePort;
    this.DATABASE_USER = databaseUser;
    this.DATABASE_PASSWORD = databasePassword;
    this.DATABASE_NAME = databaseName;
    this.DATABASE_SCHEMA = databaseSchema;
    this.DATABASE_SYNCHRONIZE = databaseSynchronize;
  }

  @IsEnum(Environment)
  // biome-ignore lint/style/useNamingConvention: NODE_ENV
  NODE_ENV: Environment;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: JWT_SECRET
  JWT_SECRET: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: JWT_EXPIRATION_TIME
  JWT_EXPIRATION_TIME: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: JWT_REFRESH_TOKEN_SECRET
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: JWT_REFRESH_TOKEN_EXPIRATION_TIME
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: DATABASE_HOST
  DATABASE_HOST: string;

  @IsNumber()
  // biome-ignore lint/style/useNamingConvention: DATABASE_PORT
  DATABASE_PORT: number;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: DATABASE_USER
  DATABASE_USER: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: DATABASE_PASSWORD
  DATABASE_PASSWORD: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: DATABASE_NAME
  DATABASE_NAME: string;

  @IsString()
  // biome-ignore lint/style/useNamingConvention: DATABASE_SCHEMA
  DATABASE_SCHEMA: string;

  @IsBoolean()
  // biome-ignore lint/style/useNamingConvention: DATABASE_SYNCHRONIZE
  DATABASE_SYNCHRONIZE: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig: EnvironmentVariables = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

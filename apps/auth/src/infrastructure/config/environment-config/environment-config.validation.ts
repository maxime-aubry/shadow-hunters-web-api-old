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
    oauthGoogleId: string,
    oauthGoogleSecret: string,
    oauthGoogleRedirectUrl: string,
    oauthGoogleExpirationTime: number,
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
    this.OAUTH_GOOGLE_ID = oauthGoogleId;
    this.OAUTH_GOOGLE_SECRET = oauthGoogleSecret;
    this.OAUTH_GOOGLE_REDIRECT_URL = oauthGoogleRedirectUrl;
    this.OAUTH_GOOGLE_EXPIRATION_TIME = oauthGoogleExpirationTime;
    this.DATABASE_HOST = databaseHost;
    this.DATABASE_PORT = databasePort;
    this.DATABASE_USER = databaseUser;
    this.DATABASE_PASSWORD = databasePassword;
    this.DATABASE_NAME = databaseName;
    this.DATABASE_SCHEMA = databaseSchema;
    this.DATABASE_SYNCHRONIZE = databaseSynchronize;
  }

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;

  @IsString()
  OAUTH_GOOGLE_ID: string;

  @IsString()
  OAUTH_GOOGLE_SECRET: string;

  @IsString()
  OAUTH_GOOGLE_REDIRECT_URL: string;

  @IsNumber()
  OAUTH_GOOGLE_EXPIRATION_TIME: number;

  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_SCHEMA: string;

  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig: EnvironmentVariables = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors: ValidationError[] = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}

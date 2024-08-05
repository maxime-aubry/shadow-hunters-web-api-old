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
    rabbitMqUser: string,
    rabbitMqPass: string,
    rabbitMqHost: string,
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
    this.RABBITMQ_USER = rabbitMqUser;
    this.RABBITMQ_PASS = rabbitMqPass;
    this.RABBITMQ_HOST = rabbitMqHost;
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
    this.POSTGRES_USER = databaseUser;
    this.POSTGRES_PASSWORD = databasePassword;
    this.POSTGRES_DB = databaseName;
    this.DATABASE_SCHEMA = databaseSchema;
    this.DATABASE_SYNCHRONIZE = databaseSynchronize;
  }

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  RABBITMQ_USER: string;

  @IsString()
  RABBITMQ_PASS: string;

  @IsString()
  RABBITMQ_HOST: string;

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
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_DB: string;

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

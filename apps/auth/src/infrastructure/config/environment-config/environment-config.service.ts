import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { DatabaseConfig } from 'apps/auth/src/domain/config/database.interface';
import type { JWTConfig } from 'apps/auth/src/domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
  constructor(private configService: ConfigService) {}

  public getJwtSecret(): string | undefined {
    return this.configService.get<string>('JWT_SECRET');
  }

  public getJwtExpirationTime(): string | undefined {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  public getJwtRefreshSecret(): string | undefined {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  public getJwtRefreshExpirationTime(): string | undefined {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  public getDatabaseHost(): string | undefined {
    return this.configService.get<string>('DATABASE_HOST');
  }

  public getDatabasePort(): number | undefined {
    return this.configService.get<number>('DATABASE_PORT');
  }

  public getDatabaseUser(): string | undefined {
    return this.configService.get<string>('DATABASE_USER');
  }

  public getDatabasePassword(): string | undefined {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  public getDatabaseName(): string | undefined {
    return this.configService.get<string>('DATABASE_NAME');
  }

  public getDatabaseSchema(): string | undefined {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  public getDatabaseSync(): boolean | undefined {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }
}

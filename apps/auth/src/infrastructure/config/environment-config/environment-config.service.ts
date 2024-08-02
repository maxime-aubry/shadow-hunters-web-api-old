import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IDatabaseConfig } from 'apps/auth/src/domain/adapters/config/database-config.interface';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/adapters/config/google-oauth-config.interface';
import type { IJwtConfig } from 'apps/auth/src/domain/adapters/config/jwt-config.interface';

@Injectable()
export class EnvironmentConfigService implements IDatabaseConfig, IJwtConfig, IGoogleOauthConfig {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  public getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') ?? '';
  }

  public getJwtExpirationTime(): number {
    return this.configService.get<number>('JWT_EXPIRATION_TIME') ?? 0;
  }

  public getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') ?? '';
  }

  public getGoogleId(): string {
    return this.configService.get<string>('OAUTH_GOOGLE_ID') ?? '';
  }

  public getGoogleSecret(): string {
    return this.configService.get<string>('OAUTH_GOOGLE_SECRET') ?? '';
  }

  public getGoogleRedicretUrl(): string {
    return this.configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL') ?? '';
  }

  public getGoogleExpirationTime(): number {
    return this.configService.get<number>('OAUTH_GOOGLE_EXPIRATION_TIME') ?? 0;
  }

  public getJwtRefreshExpirationTime(): number {
    return this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME') ?? 0;
  }

  public getDatabaseHost(): string | undefined {
    return this.configService.get<string>('DATABASE_HOST');
  }

  public getDatabasePort(): number | undefined {
    return this.configService.get<number>('DATABASE_PORT');
  }

  public getDatabaseUser(): string | undefined {
    return this.configService.get<string>('POSTGRES_USER');
  }

  public getDatabasePassword(): string | undefined {
    return this.configService.get<string>('POSTGRES_PASSWORD');
  }

  public getDatabaseName(): string | undefined {
    return this.configService.get<string>('POSTGRES_DB');
  }

  public getDatabaseSchema(): string | undefined {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  public getDatabaseSync(): boolean | undefined {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }
}

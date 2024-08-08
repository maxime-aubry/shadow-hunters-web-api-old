import type { AuthProvider } from 'apps/auth/src/infrastructure/database/entities/user.entity';

export class ValidateUserForOauthStrategyUseCaseRequest {
  constructor(email: string, provider: AuthProvider, providerId: string) {
    this.email = email;
    this.provider = provider;
    this.providerId = providerId;
  }

  public email: string;
  public provider: AuthProvider;
  public providerId: string;
}

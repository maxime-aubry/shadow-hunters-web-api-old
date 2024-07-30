import type { AuthProvider } from '../database/entities/user.entity';

export class OAuthUser {
  constructor(
    provider: AuthProvider,
    providerId: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
  ) {
    this.provider = provider;
    this.providerId = providerId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
  }

  public provider: AuthProvider;
  public providerId: string;
  public firstname: string;
  public lastname: string;
  public username: string;
  public email: string;
}

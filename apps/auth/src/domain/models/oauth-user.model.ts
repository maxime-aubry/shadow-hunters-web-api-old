import { AutoMap } from '@automapper/classes';
import type { AuthProvider } from '../../infrastructure/database/entities/user.entity';
import { User } from './user.model';

export class OAuthUser extends User {
  constructor(
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    provider: AuthProvider,
    providerId: string,
  ) {
    super(id, firstname, lastname, username, email);
    this.provider = provider;
    this.providerId = providerId;
  }

  @AutoMap()
  public provider: AuthProvider;

  @AutoMap()
  public providerId: string;
}

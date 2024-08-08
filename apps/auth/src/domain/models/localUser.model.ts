import { AutoMap } from '@automapper/classes';
import { UserModel } from './user.model';

export class LocalUserModel extends UserModel {
  constructor(
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    accessTokenCookie?: string,
    refreshTokenCookie?: string,
  ) {
    super(id, firstname, lastname, username, email);
    this.password = password;
    this.accessTokenCookie = accessTokenCookie;
    this.refreshTokenCookie = refreshTokenCookie;
  }

  @AutoMap()
  public password: string;

  @AutoMap()
  public accessTokenCookie?: string;

  @AutoMap()
  public refreshTokenCookie?: string;
}

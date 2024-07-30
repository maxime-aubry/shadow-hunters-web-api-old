import { AutoMap } from '@automapper/classes';

export class User {
  constructor(
    id: number,
    username: string,
    createdDate: Date,
    updatedDate: Date,
    lastLogin: Date,
    hashRefreshToken: string,
    password: string,
  ) {
    this.id = id;
    this.username = username;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.lastLogin = lastLogin;
    this.hashRefreshToken = hashRefreshToken;
    this.password = password;
  }

  @AutoMap()
  public id: number;

  @AutoMap()
  public username: string;

  @AutoMap()
  public createdDate: Date;

  @AutoMap()
  public updatedDate: Date;

  @AutoMap()
  public lastLogin: Date;

  @AutoMap()
  public hashRefreshToken: string;

  @AutoMap()
  public password: string;
}

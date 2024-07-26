import { AutoMap } from '@automapper/classes';

export class UserWithoutPassword {
  constructor(
    id: number,
    userName: string,
    createdDate: Date,
    updatedDate: Date,
    lastLogin: Date,
    hashRefreshToken: string,
  ) {
    this.id = id;
    this.userName = userName;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.lastLogin = lastLogin;
    this.hashRefreshToken = hashRefreshToken;
  }

  @AutoMap()
  id: number;

  @AutoMap()
  userName: string;

  @AutoMap()
  createdDate: Date;

  @AutoMap()
  updatedDate: Date;

  @AutoMap()
  lastLogin: Date;

  @AutoMap()
  hashRefreshToken: string;
}

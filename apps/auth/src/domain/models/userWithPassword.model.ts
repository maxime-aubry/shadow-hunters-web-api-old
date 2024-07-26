import { AutoMap } from '@automapper/classes';
import { UserWithoutPassword } from './userWithtoutPassword.model';

export class UserWithPassword extends UserWithoutPassword {
  constructor(
    id: number,
    userName: string,
    createdDate: Date,
    updatedDate: Date,
    lastLogin: Date,
    hashRefreshToken: string,
    password: string,
  ) {
    super(id, userName, createdDate, updatedDate, lastLogin, hashRefreshToken);
    this.password = password;
  }

  @AutoMap()
  password: string;
}

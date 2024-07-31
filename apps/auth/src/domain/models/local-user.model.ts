import { AutoMap } from '@automapper/classes';
import { User } from './user.model';

export class LocalUser extends User {
  constructor(id: string, firstname: string, lastname: string, username: string, email: string, password: string) {
    super(id, firstname, lastname, username, email);
    this.password = password;
  }

  @AutoMap()
  public password: string;
}

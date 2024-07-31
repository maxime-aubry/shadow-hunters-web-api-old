import { AutoMap } from '@automapper/classes';

export class User {
  constructor(id: string, firstname: string, lastname: string, username: string, email: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
  }

  @AutoMap()
  public id: string;

  @AutoMap()
  public firstname: string;

  @AutoMap()
  public lastname: string;

  @AutoMap()
  public username: string;

  @AutoMap()
  public email: string;
}

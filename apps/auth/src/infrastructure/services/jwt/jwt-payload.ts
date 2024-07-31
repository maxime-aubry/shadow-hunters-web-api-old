export class JwtPayload {
  constructor(id: string, firstname: string, lastname: string, username: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
  }

  public id: string;
  public firstname: string | null;
  public lastname: string | null;
  public username: string;
}

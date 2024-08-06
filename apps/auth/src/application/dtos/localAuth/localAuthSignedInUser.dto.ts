export class LocalAuthSignedInUserDto {
  constructor(
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    accessTokenCookie: string,
    refreshTokenCookie: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.accessTokenCookie = accessTokenCookie;
    this.refreshTokenCookie = refreshTokenCookie;
  }

  public firstname: string;
  public lastname: string;
  public username: string;
  public email: string;
  public password: string;
  public accessTokenCookie: string;
  public refreshTokenCookie: string;
}

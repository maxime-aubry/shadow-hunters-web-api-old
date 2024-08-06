import { AutoMap } from '@automapper/classes';

export class LocalAuthValidateUserDto {
  constructor(emailOrUsername: string, password: string) {
    this.emailOrUsername = emailOrUsername;
    this.password = password;
  }

  @AutoMap()
  public emailOrUsername: string;

  @AutoMap()
  public password: string;
}

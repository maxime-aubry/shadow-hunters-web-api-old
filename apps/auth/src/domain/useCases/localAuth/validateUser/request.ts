export class ValidateUserForLocalStrategyUseCaseRequest {
  constructor(emailOrUsername: string, password: string) {
    this.emailOrUsername = emailOrUsername;
    this.password = password;
  }

  public emailOrUsername: string;
  public password: string;
}

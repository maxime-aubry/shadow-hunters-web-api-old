export class SignInForLocalStrategyUseCaseRequest {
  constructor(usernameOrEmail: string, password: string) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }

  public readonly usernameOrEmail: string;
  public readonly password: string;
}

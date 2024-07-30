export class SignInUseCaseResponse {
  constructor(token: string) {
    this.token = token;
  }

  public token: string;
}

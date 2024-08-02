export class SignOutUseCaseResponse {
  constructor(cookies: string[]) {
    this.cookies = cookies;
  }

  public cookies: string[];
}

export class LogOutUseCaseResponse {
  constructor(cookies: string[]) {
    this.cookies = cookies;
  }

  public cookies: string[];
}

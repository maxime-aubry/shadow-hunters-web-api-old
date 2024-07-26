export class GetCookieWithJwtRefreshTokenUseCaseRequest {
  constructor(userName: string) {
    this.userName = userName;
  }

  userName: string;
}

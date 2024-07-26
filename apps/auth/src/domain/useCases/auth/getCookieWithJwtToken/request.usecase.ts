export class GetCookieWithJwtTokenUseCaseRequest {
  constructor(userName: string) {
    this.userName = userName;
  }

  userName: string;
}

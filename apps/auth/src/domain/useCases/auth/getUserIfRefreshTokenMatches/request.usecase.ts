export class GetUserIfRefreshTokenMatchesUseCaseRequest {
  constructor(refreshToken: string, userName: string) {
    this.refreshToken = refreshToken;
    this.userName = userName;
  }

  public refreshToken: string;
  public userName: string;
}

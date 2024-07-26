export class IsAuthenticatedUseCaseRequest {
  constructor(userName: string) {
    this.userName = userName;
  }

  public userName: string;
}

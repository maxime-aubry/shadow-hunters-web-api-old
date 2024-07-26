export class ValidateUserForLocalStrategyUseCaseRequest {
  constructor(userName: string) {
    this.userName = userName;
  }

  userName: string;
}

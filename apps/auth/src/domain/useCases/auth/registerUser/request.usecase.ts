export class RegisterUserUseCaseRequest {
  constructor(userName: string, email: string, password: string) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }

  public userName: string;
  public email: string;
  public password: string;
}

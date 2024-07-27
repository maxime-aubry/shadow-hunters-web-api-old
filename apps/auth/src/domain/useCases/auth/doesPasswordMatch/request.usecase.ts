export class DoesPasswordMatchUseCaseRequest {
  constructor(password: string, hashedPassword: string) {
    this.password = password;
    this.hashedPassword = hashedPassword;
  }

  public password: string;
  public hashedPassword: string;
}

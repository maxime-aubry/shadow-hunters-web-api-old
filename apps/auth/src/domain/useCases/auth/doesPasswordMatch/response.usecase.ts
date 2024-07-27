export class DoesPasswordMatchUseCaseResponse {
  constructor(doesMatch: boolean) {
    this.doesMatch = doesMatch;
  }

  public doesMatch: boolean;
}

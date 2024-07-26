// biome-ignore lint/style/useNamingConvention: TUseCase
export class UseCaseProxy<TUseCase> {
  private readonly useCase: TUseCase;

  constructor(useCase: TUseCase) {
    this.useCase = useCase;
  }

  public getInstance(): TUseCase {
    return this.useCase;
  }
}

// biome-ignore lint/style/useNamingConvention: IUseCase, TRequest, TResponse
export interface IUseCase<TRequest, TResponse> {
  execute: (request: TRequest) => TResponse;
}

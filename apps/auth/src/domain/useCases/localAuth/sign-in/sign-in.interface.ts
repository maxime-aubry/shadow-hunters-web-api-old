import type { IUseCaseAsync } from '@app/shared/useCases/usecases-async.interface';
import type { SignInForLocalStrategyUseCaseRequest } from './request';
import type { SignInForLocalStrategyUseCaseResponse } from './response';

export interface ISignInForLocalStrategyUseCase
  extends IUseCaseAsync<SignInForLocalStrategyUseCaseRequest, SignInForLocalStrategyUseCaseResponse> {}

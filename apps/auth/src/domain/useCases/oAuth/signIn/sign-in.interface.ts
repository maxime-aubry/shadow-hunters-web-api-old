import type { IUseCaseAsync } from '@app/shared/useCases/usecases-async.interface';
import type { SignInForOauthStrategyUseCaseRequest } from './request';
import type { SignInForOauthStrategyUseCaseResponse } from './response';

export interface ISignInForOauthStrategyUseCase
  extends IUseCaseAsync<SignInForOauthStrategyUseCaseRequest, SignInForOauthStrategyUseCaseResponse> {}

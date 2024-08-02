import type { IUseCaseAsync } from '@app/shared/useCases/usecases-async.interface';
import type { ValidateUserForOauthStrategyUseCaseRequest } from './request';
import type { ValidateUserForOauthStrategyUseCaseResponse } from './response';

export interface IValidateUserForOauthStrategyUseCase
  extends IUseCaseAsync<ValidateUserForOauthStrategyUseCaseRequest, ValidateUserForOauthStrategyUseCaseResponse> {}

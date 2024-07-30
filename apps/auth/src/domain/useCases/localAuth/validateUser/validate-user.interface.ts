import type { IUseCaseAsync } from '@app/shared/useCases/usecases-async.interface';
import type { ValidateUserForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/validateUser/request';
import type { ValidateUserForLocalStrategyUseCaseResponse } from './response';

export interface IValidateUserForLocalStrategyUseCase
  extends IUseCaseAsync<ValidateUserForLocalStrategyUseCaseRequest, ValidateUserForLocalStrategyUseCaseResponse> {}

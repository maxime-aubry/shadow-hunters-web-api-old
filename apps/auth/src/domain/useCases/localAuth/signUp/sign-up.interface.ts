import type { IUseCaseAsync } from '@app/shared/useCases/usecases-async.interface';
import type { SignUpForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/signUp/request';
import type { SignUpForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/signUp/response';

export interface ISignUpForLocalStrategyUseCase
  extends IUseCaseAsync<SignUpForLocalStrategyUseCaseRequest, SignUpForLocalStrategyUseCaseResponse> {}

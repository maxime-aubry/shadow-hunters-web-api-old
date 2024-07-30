import type { IUseCaseAsync } from '@app/shared/useCases/usecases-async.interface';
import type { SignInUseCaseRequest } from './request';
import type { SignInUseCaseResponse } from './response';

export interface ISignInUseCase extends IUseCaseAsync<SignInUseCaseRequest, SignInUseCaseResponse> {}

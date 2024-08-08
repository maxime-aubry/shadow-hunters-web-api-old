import type { IUseCase } from '@app/shared';
import type { SignOutUseCaseResponse } from './response';

export interface ISignOutUseCase extends IUseCase<undefined, SignOutUseCaseResponse> {}

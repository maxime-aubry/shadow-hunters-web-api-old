import type { IUseCase } from '@app/shared';
import type { LogOutUseCaseResponse } from 'apps/auth/src/domain/useCases/common/logOut/response';

export interface ILogOutUseCase extends IUseCase<undefined, LogOutUseCaseResponse> {}

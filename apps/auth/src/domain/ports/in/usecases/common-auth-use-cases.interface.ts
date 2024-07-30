import type { ILogOutUseCase } from '../../../useCases/common/logOut/log-out.interface';

export interface ICommonAuthUseCases {
  readonly logOut: ILogOutUseCase;
}

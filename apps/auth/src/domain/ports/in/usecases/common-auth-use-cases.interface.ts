import type { ISignOutUseCase } from '../../../useCases/common/signOut/sign-out.interface';

export interface ICommonAuthUseCases {
  readonly logOut: ISignOutUseCase;
}

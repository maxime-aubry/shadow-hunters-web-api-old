import type { ISignOutUseCase } from './signOut/signOut.interface';

export interface ICommonAuthUseCases {
  readonly logOut: ISignOutUseCase;
}

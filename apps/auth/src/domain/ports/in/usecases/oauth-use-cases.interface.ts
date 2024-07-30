import type { ISignInUseCase } from '../../../useCases/oAuth/signIn/sign-in.interface';

export interface IOAuthUseCases {
  readonly signIn: ISignInUseCase;
}

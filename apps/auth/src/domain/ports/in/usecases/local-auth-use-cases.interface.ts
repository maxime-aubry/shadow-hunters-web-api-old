import type { ISignInForLocalStrategyUseCase } from '../../../useCases/localAuth/sign-in/sign-in.interface';
import type { ISignUpForLocalStrategyUseCase } from '../../../useCases/localAuth/sign-up/sign-up.interface';

export interface ILocalAuthUseCases {
  readonly signUp: ISignUpForLocalStrategyUseCase;
  readonly signIn: ISignInForLocalStrategyUseCase;
}

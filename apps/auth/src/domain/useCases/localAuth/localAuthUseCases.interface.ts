import type { ISignInForLocalStrategyUseCase } from './signIn/signIn.interface';
import type { ISignUpForLocalStrategyUseCase } from './signUp/signUp.interface';
import type { IValidateUserForLocalStrategyUseCase } from './validateUser/validateUser.interface';

export interface ILocalAuthUseCases {
  readonly signUp: ISignUpForLocalStrategyUseCase;
  readonly signIn: ISignInForLocalStrategyUseCase;
  readonly validateUser: IValidateUserForLocalStrategyUseCase;
}

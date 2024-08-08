import type { ISignInForOauthStrategyUseCase } from './signIn/signIn.interface';
import type { IValidateUserForOauthStrategyUseCase } from './validateUser/validateUser.interface';

export interface IOAuthUseCases {
  readonly signIn: ISignInForOauthStrategyUseCase;
  readonly validateUser: IValidateUserForOauthStrategyUseCase;
}

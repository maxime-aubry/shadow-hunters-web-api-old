import type { ISignInForOauthStrategyUseCase } from '../../../useCases/oauth/signIn/sign-in.interface';
import type { IValidateUserForOauthStrategyUseCase } from '../../../useCases/oauth/validateUser/validate-user.interface';

export interface IOAuthUseCases {
  readonly signIn: ISignInForOauthStrategyUseCase;
  readonly validateUser: IValidateUserForOauthStrategyUseCase;
}

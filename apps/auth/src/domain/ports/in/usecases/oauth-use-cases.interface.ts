import type { ISignInForOauthStrategyUseCase } from '../../../useCases/oauth/signIn/sign-in.interface';

export interface IOAuthUseCases {
  readonly signIn: ISignInForOauthStrategyUseCase;
}

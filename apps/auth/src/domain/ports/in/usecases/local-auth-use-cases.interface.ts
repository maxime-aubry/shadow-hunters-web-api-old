import type { ISignUpForLocalStrategyUseCase } from '../../../useCases/localAuth/signUp/sign-up.interface';
import type { IValidateUserForLocalStrategyUseCase } from '../../../useCases/localAuth/validateUser/validate-user.interface';

export interface ILocalAuthUseCases {
  readonly signUp: ISignUpForLocalStrategyUseCase;
  readonly validateUser: IValidateUserForLocalStrategyUseCase;
}

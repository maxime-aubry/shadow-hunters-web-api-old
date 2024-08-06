import type { ILocalAuthSignInPresenter } from './signInPresenter/signIn.presenter.interface';
import type { ILocalAuthSignUpPresenter } from './signUpPresenter/signUp.presenter.interface';
import type { ILocalAuthValidatUserPresenter } from './validateUserPresenter/validateUser.presenter.interface';

export interface ILocalAuthPresenters {
  readonly signInPresenter: ILocalAuthSignInPresenter;
  readonly signUpPresenter: ILocalAuthSignUpPresenter;
  readonly validateUserPresenter: ILocalAuthValidatUserPresenter;
}

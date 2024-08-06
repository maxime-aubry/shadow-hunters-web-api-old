import type { ILocalAuthSignInPresenter } from './localAuthSignInPresenter/localAuthSignIn.presenter.interface';

export interface ILocalAuthPresenters {
  readonly signInPresenter: ILocalAuthSignInPresenter;
}

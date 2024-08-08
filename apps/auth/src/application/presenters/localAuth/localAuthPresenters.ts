import { Inject, Injectable } from '@nestjs/common';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { ILocalAuthPresenters } from './localAuthPresenters.interface';
import { LocalAuthSignInPresenter } from './signInPresenter/signIn.presenter.impl';
import type { ILocalAuthSignInPresenter } from './signInPresenter/signIn.presenter.interface';
import { LocalAuthSignUpPresenter } from './signUpPresenter/signUp.presenter.impl';
import type { ILocalAuthSignUpPresenter } from './signUpPresenter/signUp.presenter.interface';
import { LocalAuthValidatUserPresenter } from './validateUserPresenter/validateUser.presenter.impl';
import type { ILocalAuthValidatUserPresenter } from './validateUserPresenter/validateUser.presenter.interface';

@Injectable()
export class LocalAuthPresenters implements ILocalAuthPresenters {
  public readonly signInPresenter: ILocalAuthSignInPresenter;
  public readonly signUpPresenter: ILocalAuthSignUpPresenter;
  public readonly validateUserPresenter: ILocalAuthValidatUserPresenter;

  constructor(@Inject('IAuthMappersService') private readonly authMapperService: IAuthMappersService) {
    this.signInPresenter = new LocalAuthSignInPresenter(authMapperService);
    this.signUpPresenter = new LocalAuthSignUpPresenter(authMapperService);
    this.validateUserPresenter = new LocalAuthValidatUserPresenter(authMapperService);
  }
}

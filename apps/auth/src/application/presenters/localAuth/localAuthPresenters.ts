import { Inject, Injectable } from '@nestjs/common';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import type { ILocalAuthPresenters } from './localAuthPresenters.interface';
import { LocalAuthSignInPresenter } from './localAuthSignInPresenter/localAuthSignIn.presenter';
import type { ILocalAuthSignInPresenter } from './localAuthSignInPresenter/localAuthSignIn.presenter.interface';

@Injectable()
export class LocalAuthPresenters implements ILocalAuthPresenters {
  public readonly signInPresenter: ILocalAuthSignInPresenter;

  constructor(@Inject('IAuthMapperService') private readonly authMapperService: IAuthMappersService) {
    this.signInPresenter = new LocalAuthSignInPresenter(authMapperService);
  }
}

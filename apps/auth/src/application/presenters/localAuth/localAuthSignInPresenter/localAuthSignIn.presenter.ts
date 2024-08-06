import { LocalUserModel } from 'apps/auth/src/domain/models/localUser.model';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import { LocalAuthSignedInUserDto } from '../../../dtos/localAuth/localAuthSignedInUser.dto';
import type { ILocalAuthSignInPresenter } from './localAuthSignIn.presenter.interface';

export class LocalAuthSignInPresenter implements ILocalAuthSignInPresenter {
  constructor(private readonly authMappersService: IAuthMappersService) {}

  public getOutput(input: LocalUserModel): LocalAuthSignedInUserDto {
    return this.authMappersService.mapper.map(input, LocalUserModel, LocalAuthSignedInUserDto);
  }
}

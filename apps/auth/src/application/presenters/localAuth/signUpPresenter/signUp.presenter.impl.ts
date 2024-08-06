import { LocalUserModel } from 'apps/auth/src/domain/models/localUser.model';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import { LocalAuthSignedUpUserDto } from '../../../dtos/localAuth/localAuthSignedUpUser.dto';
import type { ILocalAuthSignUpPresenter } from './signUp.presenter.interface';

export class LocalAuthSignUpPresenter implements ILocalAuthSignUpPresenter {
  constructor(private readonly authMappersService: IAuthMappersService) {}

  public getOutput(input: LocalUserModel): LocalAuthSignedUpUserDto {
    return this.authMappersService.mapper.map(input, LocalUserModel, LocalAuthSignedUpUserDto);
  }
}

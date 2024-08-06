import { LocalUserModel } from 'apps/auth/src/domain/models/localUser.model';
import type { IAuthMappersService } from 'apps/auth/src/infrastructure/mappers/authMappers.service.interface';
import { LocalAuthValidatedUserDto } from '../../../dtos/localAuth/localAuthValidatedUser.dto';
import type { ILocalAuthValidatUserPresenter } from './validateUser.presenter.interface';

export class LocalAuthValidatUserPresenter implements ILocalAuthValidatUserPresenter {
  constructor(private readonly authMappersService: IAuthMappersService) {}

  public getOutput(input: LocalUserModel): LocalAuthValidatedUserDto {
    return this.authMappersService.mapper.map(input, LocalUserModel, LocalAuthValidatedUserDto);
  }
}

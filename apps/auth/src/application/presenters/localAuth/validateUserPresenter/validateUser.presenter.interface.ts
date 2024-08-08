import type { IPresenter } from '@app/shared/interfaces/presenters/presenter.interface';
import type { LocalUserModel } from 'apps/auth/src/domain/models/localUser.model';
import type { LocalAuthValidatedUserDto } from '../../../dtos/localAuth/localAuthValidatedUser.dto';

export interface ILocalAuthValidatUserPresenter extends IPresenter<LocalUserModel, LocalAuthValidatedUserDto> {}

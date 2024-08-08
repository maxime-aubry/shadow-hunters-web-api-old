import type { IPresenter } from '@app/shared/interfaces/presenters/presenter.interface';
import type { LocalUserModel } from 'apps/auth/src/domain/models/localUser.model';
import type { LocalAuthSignedUpUserDto } from '../../../dtos/localAuth/localAuthSignedUpUser.dto';

export interface ILocalAuthSignUpPresenter extends IPresenter<LocalUserModel, LocalAuthSignedUpUserDto> {}

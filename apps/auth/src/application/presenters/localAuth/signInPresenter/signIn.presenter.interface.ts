import type { IPresenter } from '@app/shared/interfaces/presenters/presenter.interface';
import type { LocalUserModel } from 'apps/auth/src/domain/models/localUser.model';
import type { LocalAuthSignedInUserDto } from '../../../dtos/localAuth/localAuthSignedInUser.dto';

export interface ILocalAuthSignInPresenter extends IPresenter<LocalUserModel, LocalAuthSignedInUserDto> {}

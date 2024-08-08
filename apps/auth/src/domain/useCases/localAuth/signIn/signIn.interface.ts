import type { IUseCaseAsync } from '@app/shared/interfaces/useCases/usecases-async.interface';
import type { LocalAuthSignInUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignInUser.dto';
import type { LocalAuthSignedInUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignedInUser.dto';

export interface ISignInForLocalStrategyUseCase
  extends IUseCaseAsync<LocalAuthSignInUserDto, LocalAuthSignedInUserDto> {}

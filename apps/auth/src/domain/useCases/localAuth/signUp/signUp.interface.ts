import type { IUseCaseAsync } from '@app/shared/interfaces/useCases/usecases-async.interface';
import type { LocalAuthSignUpUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignUpUser.dto';
import type { LocalAuthSignedUpUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthSignedUpUser.dto';

export interface ISignUpForLocalStrategyUseCase
  extends IUseCaseAsync<LocalAuthSignUpUserDto, LocalAuthSignedUpUserDto> {}

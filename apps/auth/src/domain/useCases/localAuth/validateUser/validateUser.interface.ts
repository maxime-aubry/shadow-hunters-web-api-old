import type { IUseCaseAsync } from '@app/shared/interfaces/useCases/usecases-async.interface';
import type { LocalAuthValidateUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthValidateUser.dto';
import type { LocalAuthValidatedUserDto } from 'apps/auth/src/application/dtos/localAuth/localAuthValidatedUser.dto';

export interface IValidateUserForLocalStrategyUseCase
  extends IUseCaseAsync<LocalAuthValidateUserDto, LocalAuthValidatedUserDto | null> {}

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from 'apps/auth/src/domain/models/user.model';
import type { ILocalAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/local-auth-use-cases.interface';
import { ValidateUserForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/validateUser/request';
import type { ValidateUserForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/validateUser/response';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('ILocalAuthUseCases') private readonly localAuthUseCases: ILocalAuthUseCases) {
    super();
  }

  async validate(emailOrUsername: string | null, password: string | null): Promise<User> {
    if (!(emailOrUsername && password)) throw new UnauthorizedException();

    const validateUserRequest: ValidateUserForLocalStrategyUseCaseRequest =
      new ValidateUserForLocalStrategyUseCaseRequest(emailOrUsername, password);
    const validateUserResponse: ValidateUserForLocalStrategyUseCaseResponse =
      await this.localAuthUseCases.validateUser.executeAsync(validateUserRequest);
    if (!validateUserResponse.user) throw new UnauthorizedException();
    return validateUserResponse.user;
  }
}

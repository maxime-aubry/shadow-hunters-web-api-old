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

  async validate(username: string, password: string): Promise<User> {
    const request: ValidateUserForLocalStrategyUseCaseRequest = new ValidateUserForLocalStrategyUseCaseRequest(
      username,
      password,
    );
    const response: ValidateUserForLocalStrategyUseCaseResponse =
      await this.localAuthUseCases.validateUser.executeAsync(request);
    if (!response.user) throw new UnauthorizedException();
    return response.user;
  }
}

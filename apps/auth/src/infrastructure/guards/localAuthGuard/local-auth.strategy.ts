import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { LocalUser } from 'apps/auth/src/domain/models/local-user.model';
import type { ILocalAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/local-auth-use-cases.interface';
import { SignInForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/sign-in/request';
import type { SignInForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/sign-in/response';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('ILocalAuthUseCases') private readonly localAuthUseCases: ILocalAuthUseCases) {
    super();
  }

  async validate(emailOrUsername: string | null, password: string | null): Promise<LocalUser> {
    if (!(emailOrUsername && password)) throw new UnauthorizedException();

    const signInRequest: SignInForLocalStrategyUseCaseRequest = new SignInForLocalStrategyUseCaseRequest(
      emailOrUsername,
      password,
    );
    const signInResponse: SignInForLocalStrategyUseCaseResponse =
      await this.localAuthUseCases.signIn.executeAsync(signInRequest);
    if (!signInResponse.user) throw new UnauthorizedException();
    return signInResponse.user;
  }
}

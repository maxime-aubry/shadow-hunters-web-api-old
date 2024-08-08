import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ValidateUserDto } from 'apps/auth/src/application/dtos/localAuth/validateUser.dto';
import type { ValidatedUserDto } from 'apps/auth/src/application/dtos/localAuth/validatedUser.dto';
import type { ILocalAuthUseCases } from 'apps/auth/src/domain/useCases/localAuth/local-auth-use-cases.interface';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('ILocalAuthUseCases') private readonly localAuthUseCases: ILocalAuthUseCases) {
    super();
  }

  async validate(emailOrUsername: string | null, password: string | null): Promise<ValidatedUserDto | null> {
    if (!(emailOrUsername && password)) return null;
    const request: ValidateUserDto = new ValidateUserDto(emailOrUsername, password);
    const response: ValidatedUserDto | null = await this.localAuthUseCases.validateUser.executeAsync(request);
    return response;
  }
}

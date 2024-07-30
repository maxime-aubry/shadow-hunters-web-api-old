import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { LocalAuthUseCasesImpl } from 'apps/auth/src/domain/useCases/localAuth/local-auth-usecases';
import { SignUpForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/signUp/request';
import type { SignUpForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/signUp/response';
import type { LocalAuthLoginDto } from './dtos/local-auth-login.dto';

@Controller()
export class LocalAuthController {
  constructor(@Inject('ILocalAuthUseCases') private readonly localAuthUseCasesCollection: LocalAuthUseCasesImpl) {}

  @Post('signup')
  public async signUp(@Body() auth: LocalAuthLoginDto): Promise<SignUpForLocalStrategyUseCaseResponse> {
    const signUpRequest: SignUpForLocalStrategyUseCaseRequest = new SignUpForLocalStrategyUseCaseRequest(
      auth.firstname,
      auth.lastname,
      auth.username,
      auth.email,
      auth.password,
    );
    const signUpResponse: SignUpForLocalStrategyUseCaseResponse =
      await this.localAuthUseCasesCollection.signUp.executeAsync(signUpRequest);
    return signUpResponse;
  }
}

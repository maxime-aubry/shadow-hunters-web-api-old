import { Body, Controller, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { LocalAuthUseCasesImpl } from 'apps/auth/src/domain/useCases/localAuth/local-auth-usecases';
import { SignInForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/sign-in/request';
import type { SignInForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/sign-in/response';
import { SignUpForLocalStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/localAuth/sign-up/request';
import type { SignUpForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/sign-up/response';
import { LocalAuthGuard } from 'apps/auth/src/infrastructure/guards/localAuthGuard/local-auth.guard';
import { LocalAuthSignInDto } from './dtos/local-auth-sign-in.dto';
import { LocalAuthSignUpDto } from './dtos/local-auth-sign-up.dto';
import { Request, Response } from 'express';

@Controller('local-auth')
@ApiTags('local-auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal server error' })
export class LocalAuthController {
  constructor(@Inject('ILocalAuthUseCases') private readonly localAuthUseCasesCollection: LocalAuthUseCasesImpl) {}

  @Post('signup')
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: LocalAuthSignUpDto })
  @ApiOperation({ description: 'signUp' })
  public async signUp(@Body() auth: LocalAuthSignUpDto): Promise<SignUpForLocalStrategyUseCaseResponse> {
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

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: LocalAuthSignInDto })
  public async signIn(@Body() auth: LocalAuthSignInDto, @Req() request: Request): Promise<SignInForLocalStrategyUseCaseResponse> {
    const signInRequest: SignInForLocalStrategyUseCaseRequest = new SignInForLocalStrategyUseCaseRequest(
      auth.usernameOrEmail,
      auth.password,
    );
    const signInResponse: SignInForLocalStrategyUseCaseResponse =
      await this.localAuthUseCasesCollection.signIn.executeAsync(signInRequest);

    request.res?.setHeader('Set-Cookie', [signInResponse.accessTokenCookie, signInResponse.refreshTokenCookie]);

    return signInResponse;
  }
}

import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/config/google-oauth-config.interface';
import type { IOAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/oauth-use-cases.interface';
import { SignInUseCaseRequest } from 'apps/auth/src/domain/useCases/oAuth/signIn/request';
import type { SignInUseCaseResponse } from 'apps/auth/src/domain/useCases/oAuth/signIn/response';
import { GoogleOauthGuard } from 'apps/auth/src/infrastructure/guards/googleOauthGuard/google-oauth.guard';
import type { OAuthUser } from 'apps/auth/src/infrastructure/guards/oauth-user';
import type { Response } from 'express';
import { GetOauthUser } from '../../decorators/get-oauth-user.decorator';

@Controller('google-oauth')
export class GoogleAuthController {
  constructor(
    @Inject('IOAuthUseCases') private readonly oauthUseCases: IOAuthUseCases,
    @Inject('IGoogleOauthConfig') private readonly googleOauthConfig: IGoogleOauthConfig,
  ) {}

  @Get('auth')
  @UseGuards(GoogleOauthGuard)
  public async auth(): Promise<void> {}

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  public async authCallback(@GetOauthUser() user: OAuthUser, @Res() response: Response): Promise<void> {
    const useCaseRequest: SignInUseCaseRequest = new SignInUseCaseRequest(
      user.provider,
      user.providerId,
      user.firstname,
      user.lastname,
      user.username,
      user.email,
    );
    const useCaseResponse: SignInUseCaseResponse = await this.oauthUseCases.signIn.executeAsync(useCaseRequest);

    response.cookie('access_token', useCaseResponse.token, {
      maxAge: this.googleOauthConfig.getGoogleExpirationTime(),
      sameSite: true,
      secure: false,
    });
  }
}

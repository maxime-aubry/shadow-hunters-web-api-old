import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import type { IFacebookOauthConfig } from 'apps/auth/src/domain/adapters/config/facebook-oauth-config.interface';
import type { IOAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/oauth-use-cases.interface';
import { SignInUseCaseRequest } from 'apps/auth/src/domain/useCases/oAuth/signIn/request';
import type { SignInUseCaseResponse } from 'apps/auth/src/domain/useCases/oAuth/signIn/response';
import { FacebookAuthGuard } from 'apps/auth/src/infrastructure/guards/oauth/facebookOauthGuard/facebook-oauth.guard';
import type { OAuthUser } from 'apps/auth/src/infrastructure/guards/oauth/oauth-user';
import type { Response } from 'express';
import { GetOauthUser } from '../../../infrastructure/guards/oauth/get-oauth-user.decorator';

@Controller('facebook-oauth')
export class FacebookAuthController {
  constructor(
    @Inject('IOAuthUseCases') private readonly oauthUseCases: IOAuthUseCases,
    @Inject('IFacebookOauthConfig') private readonly facebookOauthConfig: IFacebookOauthConfig,
  ) {}

  @Get('auth')
  @UseGuards(FacebookAuthGuard)
  public async auth(): Promise<void> {}

  @Get('callback')
  @UseGuards(FacebookAuthGuard)
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
      maxAge: this.facebookOauthConfig.getFacebookExpirationTime(),
      sameSite: true,
      secure: false,
    });
  }
}

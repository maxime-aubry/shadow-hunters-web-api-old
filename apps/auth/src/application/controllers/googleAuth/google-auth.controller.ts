import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/adapters/config/google-oauth-config.interface';
import type { OAuthUser } from 'apps/auth/src/domain/models/oauth-user.model';
import type { ICommonAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/common-auth-use-cases.interface';
import type { IOAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/oauth-use-cases.interface';
import { GoogleOauthGuard } from 'apps/auth/src/infrastructure/guards/oauth/googleOauthGuard/google-oauth.guard';
import type { Request, Response } from 'express';
import { GetOauthUser } from '../../../infrastructure/guards/oauth/get-oauth-user.decorator';

@Controller('google-oauth')
export class GoogleAuthController {
  constructor(
    @Inject('IOAuthUseCases') private readonly oauthUseCases: IOAuthUseCases,
    @Inject('IGoogleOauthConfig') private readonly googleOauthConfig: IGoogleOauthConfig,
    @Inject('ICommonAuthUseCases') private readonly commonAuthUseCases: ICommonAuthUseCases,
  ) {}

  @Get('auth')
  @UseGuards(GoogleOauthGuard)
  public async auth(): Promise<void> {}

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  public async authCallback(
    @GetOauthUser() user: OAuthUser,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    // const allocateTokensRequest: AllocateTokensUseCaseRequest = new AllocateTokensUseCaseRequest(user);
    // const allocateTokensResponse: AllocateTokensUseCaseResponse = await this.commonAuthUseCases.allocateTokens.executeAsync(allocateTokensRequest);
    // request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    // const useCaseRequest: SignInForOauthStrategyUseCaseRequest = new SignInForOauthStrategyUseCaseRequest(
    //   user.provider,
    //   user.providerId,
    //   user.firstname,
    //   user.lastname,
    //   user.username,
    //   user.email,
    // );
    // const useCaseResponse: SignInForOauthStrategyUseCaseResponse =
    //   await this.oauthUseCases.signIn.executeAsync(useCaseRequest);
    // response.cookie('access_token', useCaseResponse.token, {
    //   maxAge: this.googleOauthConfig.getGoogleExpirationTime(),
    //   sameSite: true,
    //   secure: false,
    // });
  }
}

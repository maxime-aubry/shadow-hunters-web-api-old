// import type { IGoogleOauthConfig } from '@app/shared/config/environment-config/googleOauthConfig.interface';
// import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
// import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import type { LocalUserModel } from 'apps/auth/src/domain/models/user.model';
// import type { ICommonAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/common-auth-use-cases.interface';
// import type { IOAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/oauth-use-cases.interface';
// import { GoogleOauthGuard } from 'apps/auth/src/infrastructure/guards/oauth/googleOauthGuard/google-oauth.guard';
// import type { Request, Response } from 'express';
// import { GetUser } from '../../../infrastructure/guards/getUser.decorator';

// @Controller('google-oauth')
// @ApiTags('google-auth')
// @ApiResponse({
//   status: 401,
//   description: 'No authorization token was found',
// })
// @ApiResponse({ status: 500, description: 'Internal server error' })
// export class GoogleAuthController {
//   constructor(
//     @Inject('IGoogleOauthConfig') private readonly googleOauthConfig: IGoogleOauthConfig,
//     @Inject('ICommonAuthUseCases') private readonly commonAuthUseCases: ICommonAuthUseCases,
//     @Inject('IOAuthUseCases') private readonly oauthUseCases: IOAuthUseCases,
//   ) {}

//   @Get('auth')
//   @UseGuards(GoogleOauthGuard)
//   public auth(): void {
//     console.log('auth');
//   }

//   @Get('callback')
//   @UseGuards(GoogleOauthGuard)
//   public authCallback(@GetUser() user: LocalUserModel, @Req() request: Request, @Res() response: Response): void {
//     console.log('callback');
//     console.log(user);
//     console.log(request);
//     console.log(response);
//     // const allocateTokensRequest: AllocateTokensUseCaseRequest = new AllocateTokensUseCaseRequest(user);
//     // const allocateTokensResponse: AllocateTokensUseCaseResponse =
//     //   await this.commonAuthUseCases.allocateTokens.executeAsync(allocateTokensRequest);
//     // request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
//     // const useCaseRequest: SignInForOauthStrategyUseCaseRequest = new SignInForOauthStrategyUseCaseRequest(
//     //   user.provider,
//     //   user.providerId,
//     //   user.firstname,
//     //   user.lastname,
//     //   user.username,
//     //   user.email,
//     // );
//     // const useCaseResponse: SignInForOauthStrategyUseCaseResponse =
//     //   await this.oauthUseCases.signIn.executeAsync(useCaseRequest);
//     // response.cookie('access_token', useCaseResponse.token, {
//     //   maxAge: this.googleOauthConfig.getGoogleExpirationTime(),
//     //   sameSite: true,
//     //   secure: false,
//     // });
//   }
// }

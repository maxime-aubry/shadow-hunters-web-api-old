import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/adapters/config/google-oauth-config.interface';
import type { User } from 'apps/auth/src/domain/models/user.model';
import type { IOAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/oauth-use-cases.interface';
import { ValidateUserForOauthStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/oAuth/validateUser/request';
import type { ValidateUserForOauthStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/oAuth/validateUser/response';
import { type Profile, Strategy } from 'passport-google-oauth20';
import type { OauthAccountEmail } from '../oauth-account-email';
import { OauthProfileService } from '../oauth-profile.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('IGoogleOauthConfig') private readonly googleOauthConfig: IGoogleOauthConfig,
    @Inject('IOAuthUseCases') private readonly oauthUseCases: IOAuthUseCases,
  ) {
    super({
      clientID: googleOauthConfig.getGoogleId(),
      clientSecret: googleOauthConfig.getGoogleSecret(),
      callbackURL: googleOauthConfig.getGoogleRedicretUrl(),
      scope: ['email', 'profile'],
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile, cb: any): Promise<User> {
    console.log(accessToken, refreshToken, profile, cb);
    const { provider, id, emails } = profile;
    const accountEmails: OauthAccountEmail[] = emails as OauthAccountEmail[];
    const signInRequest: ValidateUserForOauthStrategyUseCaseRequest = new ValidateUserForOauthStrategyUseCaseRequest(
      OauthProfileService.getVerifiedEmail(accountEmails),
      provider,
      id,
    );
    const signInResponse: ValidateUserForOauthStrategyUseCaseResponse =
      await this.oauthUseCases.validateUser.executeAsync(signInRequest);

    if (signInResponse.user) return signInResponse.user;
    return signInResponse.user;
  }
}

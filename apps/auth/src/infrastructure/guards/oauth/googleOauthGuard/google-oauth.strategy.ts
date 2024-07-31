import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/adapters/config/google-oauth-config.interface';
import type { OAuthUser } from 'apps/auth/src/domain/models/oauth-user.model';
import type { IOAuthUseCases } from 'apps/auth/src/domain/ports/in/usecases/oauth-use-cases.interface';
import { SignInForOauthStrategyUseCaseRequest } from 'apps/auth/src/domain/useCases/oauth/signIn/request';
import type { SignInForOauthStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/oauth/signIn/response';
import { type Profile, Strategy } from 'passport-google-oauth20';
import type { OauthAccountEmail } from '../oauth-account-email';
import type { OauthAccountOwner } from '../oauth-account-owner';
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

  public async validate(profile: Profile): Promise<OAuthUser> {
    const { provider, id, name, emails, displayName } = profile;
    const accountOwner: OauthAccountOwner = name as OauthAccountOwner;
    const accountEmails: OauthAccountEmail[] = emails as OauthAccountEmail[];
    const signInRequest: SignInForOauthStrategyUseCaseRequest = new SignInForOauthStrategyUseCaseRequest(
      provider,
      id,
      OauthProfileService.getFirstname(accountOwner),
      OauthProfileService.getLastname(accountOwner),
      displayName,
      OauthProfileService.getVerifiedEmail(accountEmails),
    );
    const signInResponse: SignInForOauthStrategyUseCaseResponse =
      await this.oauthUseCases.signIn.executeAsync(signInRequest);
    return signInResponse.user;
  }
}

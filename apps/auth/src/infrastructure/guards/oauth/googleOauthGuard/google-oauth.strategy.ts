import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/adapters/config/google-oauth-config.interface';
import { type Profile, Strategy } from 'passport-google-oauth20';
import type { OauthAccountEmail } from '../oauth-account-email';
import type { OauthAccountOwner } from '../oauth-account-owner';
import { OauthProfileService } from '../oauth-profile.service';
import { OAuthUser } from '../oauth-user';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('IGoogleOauthConfig') private readonly googleOauthConfig: IGoogleOauthConfig) {
    super({
      clientID: googleOauthConfig.getGoogleId(),
      clientSecret: googleOauthConfig.getGoogleSecret(),
      callbackURL: googleOauthConfig.getGoogleRedicretUrl(),
      scope: ['email', 'profile'],
    });
  }

  public validate(profile: Profile): OAuthUser {
    const { provider, id, name, emails, displayName } = profile;
    const accountOwner: OauthAccountOwner = name as OauthAccountOwner;
    const accountEmails: OauthAccountEmail[] = emails as OauthAccountEmail[];
    const user: OAuthUser = new OAuthUser(
      provider,
      id,
      OauthProfileService.getFirstname(accountOwner),
      OauthProfileService.getLastname(accountOwner),
      displayName,
      OauthProfileService.getVerifiedEmail(accountEmails),
    );
    return user;
  }
}

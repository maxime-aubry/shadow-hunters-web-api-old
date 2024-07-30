import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IFacebookOauthConfig } from 'apps/auth/src/domain/adapters/config/facebook-oauth-config.interface';
import { type Profile, Strategy } from 'passport-facebook';
import type { OauthAccountEmail } from '../oauth-account-email';
import type { OauthAccountOwner } from '../oauth-account-owner';
import { OauthProfileService } from '../oauth-profile.service';
import { OAuthUser } from '../oauth-user';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(@Inject() private readonly facebookOauthConfig: IFacebookOauthConfig) {
    super({
      clientID: facebookOauthConfig.getFacebookId(),
      clientSecret: facebookOauthConfig.getFacebookSecret(),
      callbackURL: facebookOauthConfig.getFacebookRedicretUrl(),
      scope: ['email', 'public_profile'],
    });
  }

  public validate(profile: Profile): OAuthUser {
    const { id, name, emails, displayName } = profile;
    const accountOwner: OauthAccountOwner = name as OauthAccountOwner;
    const accountEmails: OauthAccountEmail[] = emails as OauthAccountEmail[];
    const user: OAuthUser = new OAuthUser(
      'facebook',
      id,
      OauthProfileService.getFirstname(accountOwner),
      OauthProfileService.getLastname(accountOwner),
      displayName,
      OauthProfileService.getVerifiedEmail(accountEmails),
    );
    return user;
  }
}

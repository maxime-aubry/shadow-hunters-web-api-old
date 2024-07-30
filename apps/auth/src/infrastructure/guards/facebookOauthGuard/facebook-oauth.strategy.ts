import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IFacebookOauthConfig } from 'apps/auth/src/domain/config/facebook-oauth-config.interface';
import { OAuthUserDto } from 'apps/auth/src/presentation/dtos/sign-in-oauth-user.dto';
import { type Profile, Strategy } from 'passport-facebook';
import type { OauthAccountEmail } from '../oauth-account-email';
import type { OauthAccountOwner } from '../oauth-account-owner';
import { OauthProfileService } from '../oauth-profile.service';

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

  public validate(profile: Profile): OAuthUserDto {
    const { id, name, emails, displayName } = profile;
    const accountOwner: OauthAccountOwner = name as OauthAccountOwner;
    const accountEmails: OauthAccountEmail[] = emails as OauthAccountEmail[];
    const user: OAuthUserDto = new OAuthUserDto(
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

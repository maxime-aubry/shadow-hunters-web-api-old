import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IGoogleOauthConfig } from 'apps/auth/src/domain/config/google-oauth-config.interface';
import { OAuthUserDto } from 'apps/auth/src/presentation/dtos/sign-in-oauth-user.dto';
import { type Profile, Strategy } from 'passport-google-oauth20';
import type { OauthAccountEmail } from '../oauth-account-email';
import type { OauthAccountOwner } from '../oauth-account-owner';
import { OauthProfileService } from '../oauth-profile.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject() private readonly googleOauthConfig: IGoogleOauthConfig) {
    super({
      clientID: googleOauthConfig.getGoogleId(),
      clientSecret: googleOauthConfig.getGoogleSecret(),
      callbackURL: googleOauthConfig.getGoogleRedicretUrl(),
      scope: ['email', 'profile'],
    });
  }

  public validate(profile: Profile): OAuthUserDto {
    const { provider, id, name, emails, displayName } = profile;
    const accountOwner: OauthAccountOwner = name as OauthAccountOwner;
    const accountEmails: OauthAccountEmail[] = emails as OauthAccountEmail[];
    const user: OAuthUserDto = new OAuthUserDto(
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

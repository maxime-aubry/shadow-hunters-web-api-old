import { AuthGuardException } from '../exceptions/auth-guard.exception';
import type { OauthAccountEmail } from './oauth-account-email';
import type { OauthAccountOwner } from './oauth-account-owner';

export class OauthProfileService {
  public static getFirstname(owner: OauthAccountOwner | undefined): string {
    if (owner) return owner.givenName;
    throw new AuthGuardException('Firstname is not found.');
  }

  public static getLastname(owner: OauthAccountOwner | undefined): string {
    if (owner) return owner.familyName;
    throw new AuthGuardException('Lastname is not found.');
  }

  public static getVerifiedEmail(emails: OauthAccountEmail[] | undefined): string {
    if (emails && emails.length > 0) return emails[0].value;
    throw new AuthGuardException('Email is not found.');
  }
}

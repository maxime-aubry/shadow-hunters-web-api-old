import type { ExceptionMessagesDictionary } from '@app/shared/exceptions/exception-message-dictionary';
import { UnauthorizedException } from '@nestjs/common';

export type EUnautorizedUserExceptionKey =
  | 'ExistingEmail'
  | 'ExistingUsername'
  | 'PasswordDoesNotMatch'
  | 'CredentialsDoNotMatche'
  | 'UserNotFound';

const MESSAGES: ExceptionMessagesDictionary<EUnautorizedUserExceptionKey> = {
  ExistingEmail: 'An account with that email already exists.',
  ExistingUsername: 'An account with that username already exists.',
  PasswordDoesNotMatch: 'Password does not match.',
  CredentialsDoNotMatche: 'Credentials do not march',
  UserNotFound: 'User account not found.',
};

export class UnauthorizedUserException extends UnauthorizedException {
  constructor(key: EUnautorizedUserExceptionKey) {
    super(MESSAGES[key]);
    Object.setPrototypeOf(this, UnauthorizedUserException.prototype);
  }
}

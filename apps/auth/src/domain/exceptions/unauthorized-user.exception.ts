import type { ExceptionMessagesDictionary } from '@app/shared/exceptions/exception-message-dictionary';
import { UnauthorizedException } from '@nestjs/common';

export enum EUnautorizedUserExceptionKey {
  UserNotFound = 'UserNotFound',
  ExistingEmail = 'ExistingEmail',
  ExistingUsername = 'ExistingUsername',
}

const MESSAGES: ExceptionMessagesDictionary<EUnautorizedUserExceptionKey> = {
  [EUnautorizedUserExceptionKey.UserNotFound]: 'User account not found.',
  [EUnautorizedUserExceptionKey.ExistingEmail]: 'An account with that email already exists.',
  [EUnautorizedUserExceptionKey.ExistingUsername]: 'An account with that username already exists.',
};

export class UnauthorizedUserException extends UnauthorizedException {
  constructor(key: EUnautorizedUserExceptionKey) {
    super(MESSAGES[key]);
    Object.setPrototypeOf(this, UnauthorizedUserException.prototype);
  }
}

export class AuthGuardException extends Error {
  private static defaultMessage = 'Auth Guard exception.';

  constructor(message?: string) {
    super(`${AuthGuardException.defaultMessage} ${message}`);
    Object.setPrototypeOf(this, AuthGuardException.prototype);
  }
}

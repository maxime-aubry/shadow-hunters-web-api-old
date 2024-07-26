export class AuthRepositoryException extends Error {
  private static defaultMessage = 'Auth Repository exception.';

  constructor(message?: string) {
    super(`${AuthRepositoryException.defaultMessage} ${message}`);
    Object.setPrototypeOf(this, AuthRepositoryException.prototype);
  }
}

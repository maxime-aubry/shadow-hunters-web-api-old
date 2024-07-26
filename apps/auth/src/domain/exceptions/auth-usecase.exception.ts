export class AuthUseCaseException extends Error {
  static defaultMessage = 'Auth Use Case exception.';

  constructor(message?: string) {
    super(`${AuthUseCaseException.defaultMessage} ${message}`);
    Object.setPrototypeOf(this, AuthUseCaseException.prototype);
  }
}

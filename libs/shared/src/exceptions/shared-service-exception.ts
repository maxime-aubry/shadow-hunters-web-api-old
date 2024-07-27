export class SharedServiceException extends Error {
  static defaultMessage = 'Shared Service exception.';

  constructor(message?: string) {
    super(`${SharedServiceException.defaultMessage} ${message}`);
    Object.setPrototypeOf(this, SharedServiceException.prototype);
  }
}

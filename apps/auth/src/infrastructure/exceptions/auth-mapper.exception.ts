export class AuthMapperServiceException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, AuthMapperServiceException.prototype);
  }
}

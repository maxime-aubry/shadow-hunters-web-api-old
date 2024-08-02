import { SignOutUseCaseResponse } from './response';
import type { ISignOutUseCase } from './sign-out.interface';

export class SignOutUseCase implements ISignOutUseCase {
  public execute(): SignOutUseCaseResponse {
    const response: SignOutUseCaseResponse = new SignOutUseCaseResponse([
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ]);
    return response;
  }
}

import type { ILogOutUseCase } from './log-out.interface';
import { LogOutUseCaseResponse } from './response';

export class LogOutUseCase implements ILogOutUseCase {
  public execute(): LogOutUseCaseResponse {
    const response: LogOutUseCaseResponse = new LogOutUseCaseResponse([
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ]);
    return response;
  }
}

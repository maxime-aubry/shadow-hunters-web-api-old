import type { IUseCase } from '@app/shared';
import { LogOutUseCaseResponse } from './response.usecase';

export class LogOutUseCase implements IUseCase<undefined, LogOutUseCaseResponse> {
  public execute(): LogOutUseCaseResponse {
    const response: LogOutUseCaseResponse = new LogOutUseCaseResponse([
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ]);
    return response;
  }
}

import { Injectable } from '@nestjs/common';
import type { ICommonAuthUseCases } from '../../ports/in/usecases/common-auth-use-cases.interface';
import { LogOutUseCase } from './logOut/log-out.impl';
import type { ILogOutUseCase } from './logOut/log-out.interface';

@Injectable()
export class CommonAuthUseCasesImpl implements ICommonAuthUseCases {
  public readonly logOut: ILogOutUseCase;

  constructor() {
    this.logOut = new LogOutUseCase();
  }
}

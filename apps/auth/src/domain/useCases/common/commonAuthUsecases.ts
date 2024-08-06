import { Injectable } from '@nestjs/common';
import type { ICommonAuthUseCases } from './commonAuthUseCases.interface';
import { SignOutUseCase } from './signOut/signOut.impl';
import type { ISignOutUseCase } from './signOut/signOut.interface';

@Injectable()
export class CommonAuthUseCasesImpl implements ICommonAuthUseCases {
  public readonly logOut: ISignOutUseCase;

  constructor() {
    this.logOut = new SignOutUseCase();
  }
}

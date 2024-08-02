import { Injectable } from '@nestjs/common';
import type { ICommonAuthUseCases } from '../../ports/in/usecases/common-auth-use-cases.interface';
import { SignOutUseCase } from './signOut/sign-out.impl';
import type { ISignOutUseCase } from './signOut/sign-out.interface';

@Injectable()
export class CommonAuthUseCasesImpl implements ICommonAuthUseCases {
  public readonly logOut: ISignOutUseCase;

  constructor() {
    this.logOut = new SignOutUseCase();
  }
}

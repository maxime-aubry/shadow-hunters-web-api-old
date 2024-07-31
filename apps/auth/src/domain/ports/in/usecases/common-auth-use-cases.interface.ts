import type { IAllocateTokensUseCase } from '../../../useCases/common/allocateTokens/allocate-tokens.interface';
import type { ILogOutUseCase } from '../../../useCases/common/logOut/log-out.interface';

export interface ICommonAuthUseCases {
  readonly allocateTokens: IAllocateTokensUseCase;
  readonly logOut: ILogOutUseCase;
}

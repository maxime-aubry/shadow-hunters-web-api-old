import { Controller, Inject } from '@nestjs/common';
import type { AuthUseCasesCollection } from 'apps/auth/src/domain/useCases/auth';

@Controller()
export class AuthController {
  constructor(@Inject() private readonly authUseCasesCollection: AuthUseCasesCollection) {}
}

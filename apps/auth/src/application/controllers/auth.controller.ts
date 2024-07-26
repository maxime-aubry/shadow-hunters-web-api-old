import type { SharedService } from '@app/shared';
import { Controller, Inject } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}
}

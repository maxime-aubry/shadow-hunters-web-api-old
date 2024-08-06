import type { IMessageQueueTarget } from '@app/shared/interfaces/services/messageQueue/messageQueueTarget.interface';
import { Controller, Get, Inject } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import type { SignUpForLocalStrategyUseCaseResponse } from 'apps/auth/src/domain/useCases/localAuth/signUp/response';
import { type Observable, map } from 'rxjs';
import type { UserDto } from './dtos/user.dto';
import type { ILocalAuthySignUpPresenter } from './presenters/signUpPresenter/signUp.presenter.interface';

@Controller('local-auth')
export class LocalAuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly signUpPresenter: ILocalAuthySignUpPresenter,
  ) {}

  @Get('signUp')
  public signUp(): Observable<UserDto> {
    return this.authService
      .send<SignUpForLocalStrategyUseCaseResponse>(
        {
          target: 'local-auth/sign-up',
        } as IMessageQueueTarget,
        {},
      )
      .pipe(map(this.signUpPresenter.getOutput));
  }
}

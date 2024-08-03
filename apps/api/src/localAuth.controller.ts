import { Controller, Get } from '@nestjs/common';

@Controller()
export class LocalAuthController {
  // constructor (
  //   @Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {
  // }

  @Get('users')
  public getUsers(): string[] {
    return ['azerty'];
  }
}

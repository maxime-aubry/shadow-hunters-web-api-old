import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

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

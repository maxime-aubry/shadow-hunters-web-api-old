import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('users')
  public getUsers(): string[] {
    return ['azerty'];
  }
}

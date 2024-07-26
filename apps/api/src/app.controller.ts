import type { UserEntity } from '@app/shared';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('users')
  public async getUsers(): Promise<UserEntity[]> {
    return await [];
  }
}

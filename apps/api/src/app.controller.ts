import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthServiceProvider } from './module.providers/authService.provider';

@Controller()
export class AppController {
  constructor(@Inject(AuthServiceProvider.SERVICE_NAME) private authService: ClientProxy) {}

  @Get('auth')
  async getUsers() {
    console.log('api::controller::getUsers');
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('auth')
  async postUser() {
    console.log('api::controller::postUser');
    return this.authService.send({
      cmd: 'post-user'
    },
    {
      
    });
  }
}

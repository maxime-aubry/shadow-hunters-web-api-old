import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthServiceProvider } from './module.providers/authService.provider';

@Controller()
export class AppController {
  constructor(@Inject(AuthServiceProvider.SERVICE_NAME) private authService: ClientProxy) {}

  @Get()
  async getUser() {
    console.log('AppController > getUser');
    return this.authService.send({
      cmd: 'get-user'
    },
    {
      
    });
  }
}

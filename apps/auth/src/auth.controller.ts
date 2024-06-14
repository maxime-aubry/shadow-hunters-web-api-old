import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext) {
    console.log('AuthController > getUser');
    const channel: any = context.getChannelRef();
    const message: Record<string, any> = context.getMessage();
    channel.ack(message);

    return {
      user: 'azerty',
    };
  }
}

import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext) {
    const channel: any = context.getChannelRef();
    const originalMessage: Record<string, any> = context.getMessage();
    channel.ack(originalMessage);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    const channel: any = context.getChannelRef();
    const originalMessage: Record<string, any> = context.getMessage();
    channel.ack(originalMessage);

    return this.authService.postUser();
  }
}

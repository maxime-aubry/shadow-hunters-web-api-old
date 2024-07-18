import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext): Promise<UserEntity[]> {
    console.log('auth::controller::getUsers');
    const channel: any = context.getChannelRef();
    const originalMessage: Record<string, any> = context.getMessage();
    channel.ack(originalMessage);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    console.log('auth::controller::postUser');
    const channel: any = context.getChannelRef();
    const originalMessage: Record<string, any> = context.getMessage();
    channel.ack(originalMessage);

    return this.authService.postUser();
  }
}

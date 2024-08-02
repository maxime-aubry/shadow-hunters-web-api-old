import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { User } from 'apps/auth/src/domain/models/user.model';

class AuthRequest {
  constructor(user: User) {
    this.user = user;
  }

  public user: User;
}

export const GetUser = createParamDecorator((_, context: ExecutionContext): User => {
  const httpContext: HttpArgumentsHost = context.switchToHttp();
  const request: AuthRequest = httpContext.getRequest<AuthRequest>();
  return request.user;
});

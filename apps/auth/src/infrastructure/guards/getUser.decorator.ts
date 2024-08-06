import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { LocalUserModel } from 'apps/auth/src/domain/models/user.model';

class AuthRequest {
  constructor(user: LocalUserModel) {
    this.user = user;
  }

  public user: LocalUserModel;
}

export const GetUser = createParamDecorator((_, context: ExecutionContext): LocalUserModel => {
  const httpContext: HttpArgumentsHost = context.switchToHttp();
  const request: AuthRequest = httpContext.getRequest<AuthRequest>();
  return request.user;
});

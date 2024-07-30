import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { OauthRequest } from './oauth-request';
import type { OAuthUser } from './oauth-user';

export const GetOauthUser = createParamDecorator((_, context: ExecutionContext): OAuthUser => {
  const args: HttpArgumentsHost = context.switchToHttp();
  const request: OauthRequest = args.getRequest<OauthRequest>();
  return request.user;
});

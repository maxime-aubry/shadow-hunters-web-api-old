import type { ILoggerService } from '@app/shared/logger/logger.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IJwtConfig } from 'apps/auth/src/domain/adapters/config/jwt-config.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfig,
    @Inject('ILoggerService') private readonly logger: ILoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.getJwtRefreshSecret(),
    });
  }

  validate(payload: any): any {
    return payload;
  }
}

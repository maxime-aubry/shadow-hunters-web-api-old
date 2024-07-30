import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IJwtConfig } from 'apps/auth/src/domain/adapters/config/jwt-config.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtAuthPayload } from './jwt-auth.payload';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('IJwtConfig') private jwtConfig: IJwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.getJwtSecret(),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  public validate(payload: JwtAuthPayload): JwtAuthPayload {
    return payload;
  }
}

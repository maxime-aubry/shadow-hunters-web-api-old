import type { IJwtConfig } from '@app/shared/config/environment-config/jwtConfig.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
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

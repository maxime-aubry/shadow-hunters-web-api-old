import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtAuthPayload } from './jwt-auth.payload';

export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('JWTSECRET') private jwtSecret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      passReqToCallback: true,
    });
  }

  public validate(payload: JwtAuthPayload): JwtAuthPayload {
    return payload;
  }
}

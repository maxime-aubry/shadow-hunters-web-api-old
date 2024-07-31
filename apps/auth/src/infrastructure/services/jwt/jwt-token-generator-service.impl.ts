import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IJwtConfig } from 'apps/auth/src/domain/adapters/config/jwt-config.interface';
import type { IJwtTokenGenerator } from 'apps/auth/src/domain/adapters/services/jwt/jwt-token-generator.interface';
import type { User } from 'apps/auth/src/domain/models/user.model';
import { JwtPayload } from './jwt-payload';
import { JwtTokenService } from './jwt-token-service.impl';

@Injectable()
export class JwtTokenGeneratorServiceImpl extends JwtTokenService implements IJwtTokenGenerator {
  constructor(
    @Inject(JwtService) protected readonly jwtService: JwtService,
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfig,
  ) {
    super(jwtService);
  }

  public generateToken(user: User): string {
    const payload: JwtPayload = new JwtPayload(user.id, user.firstname, user.lastname, user.username);
    const secret: string = this.jwtConfig.getJwtSecret();
    const expirationTime: string = `${this.jwtConfig.getJwtExpirationTime()}s`;
    const token: string = this.createToken(payload, secret, expirationTime);
    return token;
  }

  public generateCookieWithToken(token: string): string {
    const cookie: string = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    return cookie;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IJwtConfig } from 'apps/auth/src/domain/adapters/config/jwt-config.interface';
import type { IJwtRefreshTokenGenerator } from 'apps/auth/src/domain/adapters/services/jwt/jwt-refresh-token-generator.interface';
import type { User } from 'apps/auth/src/domain/models/user.model';
import { JwtPayload } from './jwt-payload';
import { JwtTokenService } from './jwt-token-service.impl';

@Injectable()
export class JwtRefreshTokenGeneratorServiceImpl extends JwtTokenService implements IJwtRefreshTokenGenerator {
  constructor(
    @Inject(JwtService) protected readonly jwtService: JwtService,
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfig,
  ) {
    super(jwtService);
  }

  public generateToken(user: User): string {
    const payload: JwtPayload = new JwtPayload(user.id, user.firstname, user.lastname, user.username);
    const secret: string = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn: string = `${this.jwtConfig.getJwtRefreshExpirationTime()}s`;
    const token: string = this.createToken(payload, secret, expiresIn);
    return token;
  }

  public generateCookieWithToken(token: string): string {
    const cookie: string = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }
}

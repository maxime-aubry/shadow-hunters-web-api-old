import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IJwtServicePayload } from 'apps/auth/src/domain/adapters/jwt-payload.interface';
import type { IJwtService } from '../../../domain/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  public async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  public createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}

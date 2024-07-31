import type { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './jwt-payload';

export class JwtTokenService {
  constructor(protected readonly jwtService: JwtService) {}

  protected async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  protected createToken(payload: JwtPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}

import type { IJwtServicePayload } from './jwt-payload.interface';

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}

// biome-ignore lint/style/useNamingConvention: IJwtServicePayload
export interface IJwtServicePayload {
  username: string;
}

// biome-ignore lint/style/useNamingConvention: IJwtService
export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}

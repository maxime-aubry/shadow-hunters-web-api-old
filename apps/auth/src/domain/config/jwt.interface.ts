// biome-ignore lint/style/useNamingConvention: JWTConfig
export interface JWTConfig {
  getJwtSecret(): string | undefined;
  getJwtExpirationTime(): string | undefined;
  getJwtRefreshSecret(): string | undefined;
  getJwtRefreshExpirationTime(): string | undefined;
}

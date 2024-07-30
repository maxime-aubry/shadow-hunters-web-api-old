export interface IGoogleOauthConfig {
  getGoogleId(): string;
  getGoogleSecret(): string;
  getGoogleRedicretUrl(): string;
  getGoogleExpirationTime(): number;
}

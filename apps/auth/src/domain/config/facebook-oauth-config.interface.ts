export interface IFacebookOauthConfig {
  getFacebookId(): string;
  getFacebookSecret(): string;
  getFacebookRedicretUrl(): string;
  getFacebookExpirationTime(): number;
}

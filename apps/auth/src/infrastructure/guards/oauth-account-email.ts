export class OauthAccountEmail {
  constructor(value: string, verified: boolean) {
    this.value = value;
    this.verified = verified;
  }

  value: string;
  verified: boolean;
}

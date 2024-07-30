export class OauthAccountOwner {
  constructor(familyName: string, givenName: string, middleName?: string) {
    this.familyName = familyName;
    this.givenName = givenName;
    this.middleName = middleName;
  }

  public familyName: string;
  public givenName: string;
  public middleName?: string;
}

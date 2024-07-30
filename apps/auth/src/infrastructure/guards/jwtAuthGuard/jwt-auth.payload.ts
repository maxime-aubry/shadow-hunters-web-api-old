export class JwtAuthPayload {
  constructor(sub: string, username: string) {
    this.sub = sub;
    this.username = username;
  }

  sub: string;
  username: string;
}

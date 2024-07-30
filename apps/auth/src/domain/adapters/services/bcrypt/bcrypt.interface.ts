export interface IBcryptService {
  hashAsync(hashString: string): Promise<string>;
  compareAsync(password: string, hashPassword: string): Promise<boolean>;
}

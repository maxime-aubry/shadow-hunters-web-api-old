// biome-ignore lint/style/useNamingConvention: IBcryptService
export interface IBcryptService {
  hash(hashString: string): Promise<string>;
  compare(password: string, hashPassword: string): Promise<boolean>;
}

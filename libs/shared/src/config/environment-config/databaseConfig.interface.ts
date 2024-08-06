export interface IDatabaseConfig {
  getDatabaseHost(): string | undefined;
  getDatabasePort(): number | undefined;
  getDatabaseUser(): string | undefined;
  getDatabasePassword(): string | undefined;
  getDatabaseName(): string | undefined;
  getDatabaseSchema(): string | undefined;
  getDatabaseSync(): boolean | undefined;
}

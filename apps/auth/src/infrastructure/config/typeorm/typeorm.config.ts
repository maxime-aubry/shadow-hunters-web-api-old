import { config } from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

if (process.env.NODE_ENV === 'local') {
  config({ path: './env/local.env' });
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT ?? '0'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [`${__dirname}./../../database/entities/*.entity{.ts,.js}`],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrationsTableName: 'migration_todo',
  migrations: ['database/migrations/**/*{.ts,.js}'],
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);

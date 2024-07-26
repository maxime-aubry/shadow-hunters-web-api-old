import { DataSource, type DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [`${__dirname}./../../database/entities/*.entity{.ts,.js}`],
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);

import { DataSourceOptions } from 'typeorm';
import { User } from '../user/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'funapp',
  entities: [User],
  synchronize: true,
};

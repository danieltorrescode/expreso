import { DataSource } from 'typeorm';
import mongoose from 'mongoose';
import { DB, NO_SQL_DB_URI, DEV } from './constants';
// import path from 'path';

const FILE_EXT = DEV ? 'ts' : 'js';

export const database = new DataSource({
  type: 'postgres',
  host: DB.host,
  port: Number(DB.port),
  username: DB.username,
  password: DB.password,
  database: DB.name,
  entities: [`**/**/entities.${FILE_EXT}`],
  logging: true,
  synchronize: true,
});

// establish database connection
export const DataBaseConnection = (): void => {
  database
    .initialize()
    .then(() => {
      console.log('PostgreSQL connection has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
};

export const NoSQLDBConnection = (): void => {
  mongoose
    .connect(NO_SQL_DB_URI)
    .then((db) =>
      console.log('mongodb connection has been established successfully.'),
    )
    .catch((err) => console.error(err));
};

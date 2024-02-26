import { settings } from './settings';
import { DataSource } from 'typeorm';

export const postgres = new DataSource({
  type: 'postgres',
  host: settings.postgres.host,
  port: settings.postgres.port,
  username: settings.postgres.username,
  password: settings.postgres.password,
  database: settings.postgres.database,
  entities: ['src/entity/*.js'],
  logging: true,
  synchronize: true,
});

// establish database connection

export const postgresConnect = (): void => {
  postgres
    .initialize()
    .then(() => {
      console.log('PostgreSQL connection has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
};

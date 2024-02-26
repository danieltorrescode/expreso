export const settings = {
  secret: 'expreso.key',
  port: 8080,
  postgres: {
    host: '172.18.0.2',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'workspace',
  },
  mongo: 'mongodb://172.18.0.3:27017/workspace',
  origins: {
    origin: ['http://localhost:8000', 'http://localhost:8087'],
  },
};

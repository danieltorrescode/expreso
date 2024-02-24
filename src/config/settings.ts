export const settings = {
  secret: 'expreso.key',
  port: 8080,
  postgres: 'postgres://postgres:123@postgres:5432/expreso',
  mongo: 'mongodb://mongo:27017/expreso',
  origins: {
    origin: ['http://localhost:8000', 'http://localhost:8087'],
  },
};

const settings = {};

settings.secret = 'expreso.key';
settings.port = 8080;
settings.postgres = 'postgres://postgres:123@postgres:5432/expreso';
settings.mongo = 'mongodb://mongo:27017/expreso';
settings.origins = {
  origin: ['http://localhost:8086', 'http://localhost:8087'],
};

module.exports = settings;

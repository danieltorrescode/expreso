const settings = {};

settings.secret = 'mevn.key';
settings.port = 8080;
settings.origins = {origin: ['http://localhost:8086','http://localhost:8087']}; 

module.exports = settings;

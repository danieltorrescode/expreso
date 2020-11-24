const { Sequelize } = require('sequelize');
const settings = require('./settings');

// Passing a connection URI
const sequelize = new Sequelize(settings.postgres); // Example for postgres

const postgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgres connection has been established successfully.');
  } catch (error) {
    console.error('Postgres unable to connect to the database:', error);
    return false;
  }
  return true;
};

const dbSync = async () => {
  await sequelize.drop();
  console.log('All tables dropped!');

  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully.');
};

module.exports = { postgres, sequelize, dbSync };

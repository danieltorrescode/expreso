const { Sequelize } = require('sequelize');

// Passing a connection URI
const sequelize = new Sequelize(
  'postgres://postgres:123@postgres:5432/expreso'
); // Example for postgres

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
module.exports = postgres;

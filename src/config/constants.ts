export const DEBUG = process.env.DEBUG;
export const DEV = process.env.DEV === 'true' ? true : false;
export const SECRET = String(process.env.SECRET);
export const PORT = process.env.PORT;
export const DB = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
};
export const NO_SQL_DB_URI = String(process.env.NO_SQL_DB_URI);
export const ORIGINS = {
  origin: [process.env.ORIGINS],
};

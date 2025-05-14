require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT || "postgres",
  timezone: "-03:00",
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "pokemondb",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
}
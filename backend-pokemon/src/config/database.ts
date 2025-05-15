import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

export default {
  dialect: process.env.DB_DIALECT || "postgres",
  timezone: "-03:00",
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "jazidapokemon",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
}
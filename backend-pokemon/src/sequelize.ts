import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Pokemon } from './models/Pokemon';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

const sequelizeConfig = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'jazidapokemon',
  models: [Pokemon]
} as SequelizeOptions;

export const sequelize = new Sequelize(sequelizeConfig);

export const authenticateDB = async () => {
    try {
        // O método existe em runtime, mas não está nos tipos, então usamos cast
        await (sequelize as any).authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        return true;
    } catch (err) {
        console.error('Erro ao conectar no banco de dados:', err);
        throw new Error('Falha ao conectar com o banco de dados');
    }
};

import { Sequelize } from 'sequelize-typescript';
import { Pokemon } from './models/Pokemon';
require('dotenv').config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pokemondb',
});

sequelize.addModels([Pokemon]);

export const authenticateDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        return true;
    } catch (err) {
        console.error('Erro ao conectar no banco de dados:', err);
        throw new Error('Falha ao conectar com o banco de dados');
    }
};

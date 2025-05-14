import express from 'express';
import cors from 'cors';
import router from './src/routes';
import { authenticateDB } from './src/sequelize';
import 'reflect-metadata';

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

authenticateDB().then(() => {
  const PORT = process.env.PORT || 8088;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Falha ao iniciar o servidor:', error.message);
  process.exit(1);
});

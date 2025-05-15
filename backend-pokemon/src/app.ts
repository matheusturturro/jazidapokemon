import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import { authenticateDB } from './sequelize';
import 'reflect-metadata';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// Middleware para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({ 
    erro: 'Rota não encontrada',
    mensagem: 'A URL requisitada não existe nesta API'
  });
});

// Middleware global para tratamento de erros
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ 
    erro: 'Erro interno do servidor',
    mensagem: process.env.NODE_ENV === 'production' 
      ? 'Ocorreu um erro inesperado' 
      : err.message
  });
});

authenticateDB().then(() => {
  const PORT = process.env.PORT || 8088;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Falha ao iniciar o servidor:', error.message);
  process.exit(1);
});

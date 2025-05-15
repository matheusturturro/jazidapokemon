import express from 'express';
import pokemonRouter from './pokemonRoutes';

const router = express.Router();

router.use('/', pokemonRouter);

export default router;


//Criamos um roteador isolado (router).
// Inserimos nele todas as rotas de Pokémon (pokemonRouter) a partir do caminho raiz ('/').
// Exportamos esse roteador composto para ser usado no ponto de entrada da API, mantendo
//  a organização e separação de responsabilidades entre os diversos grupos de rotas.
import express from 'express';
import pokemonRouter from './pokemonRoutes';

const router = express.Router();

router.use('/', pokemonRouter);

export default router;

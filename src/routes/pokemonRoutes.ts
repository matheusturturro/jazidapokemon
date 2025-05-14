import express, { Router, RequestHandler } from 'express';
import * as PokemonController from '../controllers/PokemonController';
import * as BatalhaController from '../controllers/BatalhaController';

const router: Router = express.Router();

router.get('/pokemons', PokemonController.getAllPokemons as unknown as RequestHandler);
router.get('/pokemons/:id', PokemonController.getPokemonById as unknown as RequestHandler);
router.post('/pokemons', PokemonController.createPokemon as unknown as RequestHandler);
router.put('/pokemons/:id', PokemonController.updatePokemon as unknown as RequestHandler);
router.delete('/pokemons/:id', PokemonController.deletePokemon as unknown as RequestHandler);
router.post('/batalhar/:pokemonAId/:pokemonBId', BatalhaController.battlePokemons as unknown as RequestHandler);

export default router;

import { Request, Response } from 'express';
import Pokemon from '../models/Pokemon';

export const battlePokemons = async (req: Request, res: Response) => {
    const pokemonAId = parseInt(req.params.pokemonAId);
    const pokemonBId = parseInt(req.params.pokemonBId);
  
    if (pokemonAId === pokemonBId) {
      return res.status(400).json({ erro: 'Os pokémons devem ser diferentes' });
    }
  
    const pokemonA = await Pokemon.findByPk(pokemonAId);
    const pokemonB = await Pokemon.findByPk(pokemonBId);
  
    if (!pokemonA || !pokemonB) {
      return res.status(404).json({ erro: 'Um ou ambos os pokémons não foram encontrados' });
    }
  
    const total = pokemonA.nivel + pokemonB.nivel;
    const probA = pokemonA.nivel / total;
    const random = Math.random();
  
    let vencedor, perdedor;
    if (random < probA) {
      vencedor = pokemonA;
      perdedor = pokemonB;
    } else {
      vencedor = pokemonB;
      perdedor = pokemonA;
    }
  
    vencedor.nivel += 1;
    perdedor.nivel -= 1;
  
    await vencedor.save();
  
    let perdedorData = perdedor.toJSON();
    if (perdedor.nivel <= 0) {
      perdedorData.nivel = 0;
      await perdedor.destroy();
    } else {
      await perdedor.save();
    }
  
    return res.status(200).json({
      vencedor: vencedor,
      perdedor: perdedorData
    });
};
  
import { Request, Response } from 'express';
import { Pokemon } from '../models/Pokemon';

export const battlePokemons = async (req: Request, res: Response) => {
    const pokemonAId = parseInt(req.params.pokemonAId);
    const pokemonBId = parseInt(req.params.pokemonBId);
    
    if (isNaN(pokemonAId) || isNaN(pokemonBId)) {
      return res.status(400).json({ erro: 'IDs inválidos' });
    }
  
    if (pokemonAId === pokemonBId) {
      return res.status(400).json({ erro: 'Os pokémons devem ser diferentes' });
    }
    
    try {
      const pokemonA = await (Pokemon as any).findByPk(pokemonAId);
      const pokemonB = await (Pokemon as any).findByPk(pokemonBId);
    
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
      await vencedor.save();
      
      if (perdedor.nivel <= 1) {
        const perdedorData = perdedor.toJSON();
        perdedorData.nivel = 0;
        await perdedor.destroy();
        
        return res.status(200).json({
          message: "Batalha realizada com sucesso. O Pokémon perdedor foi derrotado!",
          vencedor: vencedor,
          perdedor: perdedorData
        });
      } else {
        perdedor.nivel -= 1;
        await perdedor.save();
        
        return res.status(200).json({
          message: "Batalha realizada com sucesso",
          vencedor: vencedor,
          perdedor: perdedor
        });
      }
    } catch (error) {
      console.error('Erro ao processar batalha:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
  
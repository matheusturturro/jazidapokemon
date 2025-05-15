import { Request, Response } from 'express';
import { Pokemon } from '../models/Pokemon';

const tiposValidos = ['charizard', 'mewtwo', 'pikachu'];

// Listar todos os pokémons
export const getAllPokemons = async (req: Request, res: Response) => {
  const pokemons = await (Pokemon as any).findAll();
  res.status(200).json({ message: "Ok", data: pokemons });
};

// Buscar um Pokémon específico pelo ID
export const getPokemonById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = await (Pokemon as any).findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  res.status(200).json({ message: "Ok", data: pokemon });
};

// Criar novo pokémon
export const createPokemon = async (req: Request, res: Response) => {
  const { tipo, treinador } = req.body;

  if (!tipo || typeof tipo !== 'string') {
    return res.status(400).json({ erro: 'Tipo é obrigatório e deve ser uma string' });
  }

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ erro: `Tipo inválido. Tipos válidos: ${tiposValidos.join(', ')}` });
  }

  if (!treinador || typeof treinador !== 'string') {
    return res.status(400).json({ erro: 'Treinador é obrigatório e deve ser uma string' });
  }

  try {
    const pokemon = await (Pokemon as any).create({
      tipo,
      treinador,
      nivel: 1
    });
    res.status(201).json({ message: "Pokémon criado com sucesso", data: pokemon });
  } catch (error) {
    console.error('Erro ao criar pokémon:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Atualizar treinador do pokémon
export const updatePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const { treinador } = req.body;

  if (!treinador || typeof treinador !== 'string') {
    return res.status(400).json({ erro: 'Treinador é obrigatório e deve ser uma string' });
  }

  try {
    const pokemon = await (Pokemon as any).findByPk(id);

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }

    await pokemon.update({ treinador });
    res.status(200).json({ message: "Pokémon atualizado com sucesso", data: pokemon });
  } catch (error) {
    console.error('Erro ao atualizar pokémon:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Deletar pokémon
export const deletePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const pokemon = await (Pokemon as any).findByPk(id);

    if (!pokemon) {
      return res.status(404).json({ erro: 'Pokémon não encontrado' });
    }

    await pokemon.destroy();
    res.status(200).json({ message: "Pokémon excluído com sucesso" });
  } catch (error) {
    console.error('Erro ao excluir pokémon:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

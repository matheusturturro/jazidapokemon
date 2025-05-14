import { Request, Response } from 'express';
import { Pokemon } from '../models/Pokemon';

const tiposValidos = ['charizard', 'mewtwo', 'pikachu'];

// Listar todos os pokémons
export const getAllPokemons = async (req: Request, res: Response) => {
  const pokemons = await Pokemon.findAll();
  res.status(200).json({ message: "Ok", data: pokemons });
};

//  Busca um Pokémon específico pelo ID
export const getPokemonById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  res.status(200).json({ message: "Ok", data: pokemon });
};

// Criar novo pokémon
export const createPokemon = async (req: Request, res: Response) => {
  const { tipo, treinador } = req.body;
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ erro: 'Tipo inválido' });
  }
  const pokemon = await Pokemon.create({
    tipo,
    treinador,
    nivel: 1
  });
  res.status(200).json({ message: "Ok", data: pokemon });
};

// Atualizar treinador do pokémon
export const updatePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { treinador } = req.body;
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  await pokemon.update({ treinador });
  res.status(204).send();
};

// Deletar pokémon
export const deletePokemon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pokemon = await Pokemon.findByPk(id);
  if (!pokemon) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
  await pokemon.destroy();
  res.status(204).send();
};
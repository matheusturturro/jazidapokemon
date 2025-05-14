import axios from 'axios';
import type { Pokemon, PokemonFormData } from '../types/pokemon';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8088';

const api = axios.create({
  baseURL: API_URL,
});

export const getPokemons = async (): Promise<Pokemon[]> => {
  const response = await api.get('/pokemons');
  return response.data.data;
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await api.get(`/pokemons/${id}`);
  return response.data.data;
};

export const createPokemon = async (pokemonData: PokemonFormData): Promise<Pokemon> => {
  const response = await api.post('/pokemons', pokemonData);
  return response.data.data;
};

export const updatePokemon = async (id: number, treinador: string): Promise<void> => {
  await api.put(`/pokemons/${id}`, { treinador });
};

export const deletePokemon = async (id: number): Promise<void> => {
  await api.delete(`/pokemons/${id}`);
};

export default api; 
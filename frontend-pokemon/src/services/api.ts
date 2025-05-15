import axios, { AxiosError } from 'axios';
import type { Pokemon, PokemonFormData } from '@/types/pokemon';

// If in development, rely on Vite's proxy configuration
const API_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:8088');

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    // Erros específicos por código de status
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = 'Requisição inválida';
          break;
        case 401:
          error.message = 'Não autorizado';
          break;
        case 404:
          error.message = 'Recurso não encontrado';
          break;
        case 500:
          error.message = 'Erro interno do servidor';
          break;
        default:
          error.message = `Erro na requisição: ${error.response.status}`;
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      error.message = 'Servidor não respondeu. Verifique sua conexão.';
    } else {
      // Algo aconteceu na configuração da requisição
      error.message = 'Erro ao configurar requisição';
    }
    
    return Promise.reject(error);
  }
);

export const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await api.get('/pokemons');
    
    // Verificar diferentes formatos possíveis de resposta
    if (response.data && typeof response.data === 'object') {
      // Se a resposta tem o formato { data: [...] }
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // Se a resposta é diretamente um array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Outros formatos possíveis
      console.warn('Formato de resposta inesperado:', response.data);
      return [];
    }
    
    console.warn('Resposta vazia ou inválida');
    return [];
  } catch (error) {
    console.error('Erro ao buscar pokémons:', error);
    throw error;
  }
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const response = await api.get(`/pokemons/${id}`);
    
    // Verificar diferentes formatos possíveis de resposta
    if (response.data && typeof response.data === 'object') {
      // Se a resposta tem o formato { data: {...} }
      if (response.data.data && typeof response.data.data === 'object') {
        return response.data.data;
      }
      
      // Se a resposta é diretamente o objeto
      if (!response.data.data && response.data.id) {
        return response.data;
      }
    }
    
    throw new Error('Formato de resposta inesperado ou Pokémon não encontrado');
  } catch (error) {
    console.error(`Erro ao buscar pokémon ${id}:`, error);
    throw error;
  }
};

export const createPokemon = async (pokemonData: PokemonFormData): Promise<Pokemon> => {
  try {
    const response = await api.post('/pokemons', pokemonData);
    
    if (response.data && typeof response.data === 'object') {
      // Se a resposta tem o formato { data: {...} }
      if (response.data.data && typeof response.data.data === 'object') {
        return response.data.data;
      }
      
      // Se a resposta é diretamente o objeto
      if (!response.data.data && response.data.id) {
        return response.data;
      }
    }
    
    throw new Error('Formato de resposta inesperado');
  } catch (error) {
    console.error('Erro ao criar pokémon:', error);
    throw error;
  }
};

export const updatePokemon = async (id: number, treinador: string): Promise<void> => {
  try {
    await api.put(`/pokemons/${id}`, { treinador });
  } catch (error) {
    console.error(`Erro ao atualizar pokémon ${id}:`, error);
    throw error;
  }
};

export const deletePokemon = async (id: number): Promise<void> => {
  try {
    await api.delete(`/pokemons/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar pokémon ${id}:`, error);
    throw error;
  }
};

export default api; 
import { useEffect, useState } from 'react';
import { PokemonCard } from '../../components/PokemonCard';
import { PokemonForm } from '../../components/PokemonForm';
import type { Pokemon, PokemonFormData } from '../../types/pokemon';
import { createPokemon, getPokemons } from '../../services/api';
import styles from './styles.module.css';

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons();
      setPokemons(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar Pokémons';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const handleCreatePokemon = async (data: PokemonFormData) => {
    try {
      await createPokemon(data);
      setShowForm(false);
      loadPokemons();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar Pokémon';
      setError(errorMessage);
      console.error(err);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Meus Pokémons</h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Adicionar Pokémon'}
        </button>
      </header>

      {showForm && (
        <div className={styles.formContainer}>
          <PokemonForm onSubmit={handleCreatePokemon} />
        </div>
      )}

      <div className={styles.grid}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
} 
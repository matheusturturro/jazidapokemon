import { useEffect, useState } from 'react';
import { PokemonCard } from '@/components/PokemonCard';
import { PokemonForm } from '@/components/PokemonForm';
import type { Pokemon, PokemonFormData } from '@/types/pokemon';
import { createPokemon, getPokemons } from '@/services/api';
import styles from './styles.module.css';

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPokemons = async () => {
      try {
        setLoading(true);
        const data = await getPokemons();
        
        if (isMounted) {
          // Garantir que data é um array
          if (Array.isArray(data)) {
            setPokemons(data);
          } else {
            console.error('Dados recebidos não são um array:', data);
            setPokemons([]);
            setError('Formato de dados inválido');
          }
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar Pokémons';
          setError(errorMessage);
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPokemons();

    // Função de cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreatePokemon = async (data: PokemonFormData) => {
    try {
      await createPokemon(data);
      setShowForm(false);
      
      // Recarregar a lista após criar um novo Pokémon
      setLoading(true);
      const updatedData = await getPokemons();
      
      // Garantir que updatedData é um array
      if (Array.isArray(updatedData)) {
        setPokemons(updatedData);
      } else {
        console.error('Dados recebidos após criação não são um array:', updatedData);
        // Recarregar todos os pokemons em vez de definir um array vazio
        const allPokemons = await getPokemons();
        if (Array.isArray(allPokemons)) {
          setPokemons(allPokemons);
        } else {
          setPokemons([]);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar Pokémon';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
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
        {Array.isArray(pokemons) && pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon?.id || Math.random()} pokemon={pokemon} />
          ))
        ) : (
          <div className={styles.emptyState}>Nenhum Pokémon encontrado</div>
        )}
      </div>
    </div>
  );
} 
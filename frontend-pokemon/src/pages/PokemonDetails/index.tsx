import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonForm } from '../../components/PokemonForm';
import type { Pokemon, PokemonFormData } from '../../types/pokemon';
import { getPokemonById, updatePokemon, deletePokemon } from '../../services/api';
import styles from './styles.module.css';

export function PokemonDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadPokemon = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await getPokemonById(parseInt(id));
      setPokemon(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [id]);

  const handleUpdatePokemon = async (data: PokemonFormData) => {
    if (!id) return;

    try {
      await updatePokemon(parseInt(id), data.treinador);
      setIsEditing(false);
      loadPokemon();
    } catch (err) {
      setError('Erro ao atualizar Pokémon');
      console.error(err);
    }
  };

  const handleDeletePokemon = async () => {
    if (!id) return;

    if (!window.confirm('Tem certeza que deseja excluir este Pokémon?')) {
      return;
    }

    try {
      await deletePokemon(parseInt(id));
      navigate('/');
    } catch (err) {
      setError('Erro ao excluir Pokémon');
      console.error(err);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!pokemon) {
    return <div className={styles.error}>Pokémon não encontrado</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Detalhes do Pokémon</h1>
        <div className={styles.actions}>
          <button 
            className={styles.editButton}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
          <button 
            className={styles.deleteButton}
            onClick={handleDeletePokemon}
          >
            Excluir
          </button>
        </div>
      </header>

      {isEditing ? (
        <div className={styles.formContainer}>
          <PokemonForm 
            onSubmit={handleUpdatePokemon}
            initialData={{ tipo: pokemon.tipo, treinador: pokemon.treinador }}
            submitText="Salvar Alterações"
          />
        </div>
      ) : (
        <div className={styles.details}>
          <div className={styles.card}>
            <h2 className={styles.title}>{pokemon.tipo}</h2>
            <p className={styles.info}>Treinador: {pokemon.treinador}</p>
            <p className={styles.info}>Nível: {pokemon.nivel}</p>
          </div>
        </div>
      )}
    </div>
  );
} 
import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../../types/pokemon';
import styles from './styles.module.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{pokemon.tipo}</h2>
      <p className={styles.info}>Treinador: {pokemon.treinador}</p>
      <p className={styles.info}>Nível: {pokemon.nivel}</p>
      <button className={styles.button} onClick={handleClick}>
        Ver Detalhes
      </button>
    </div>
  );
} 
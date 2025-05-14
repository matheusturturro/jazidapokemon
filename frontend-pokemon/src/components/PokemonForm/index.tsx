import { useState, FormEvent, ChangeEvent } from 'react';
import type { PokemonFormData } from '../../types/pokemon';
import styles from './styles.module.css';

interface PokemonFormProps {
  onSubmit: (data: PokemonFormData) => void;
  initialData?: PokemonFormData;
  submitText?: string;
}

export function PokemonForm({ 
  onSubmit, 
  initialData = { tipo: '', treinador: '' },
  submitText = 'Criar Pokémon'
}: PokemonFormProps) {
  const [formData, setFormData] = useState<PokemonFormData>(initialData);
  const [errors, setErrors] = useState<Partial<PokemonFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PokemonFormData> = {};

    if (!formData.tipo) {
      newErrors.tipo = 'Selecione um tipo de Pokémon';
    }

    if (!formData.treinador) {
      newErrors.treinador = 'Digite o nome do treinador';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={`${styles.input} ${errors.tipo ? styles.inputError : ''}`}
        >
          <option value="">Selecione um tipo</option>
          <option value="pikachu">Pikachu</option>
          <option value="charizard">Charizard</option>
          <option value="mewtwo">Mewtwo</option>
        </select>
        {errors.tipo && <span className={styles.error}>{errors.tipo}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="treinador">Treinador</label>
        <input
          type="text"
          id="treinador"
          name="treinador"
          value={formData.treinador}
          onChange={handleChange}
          className={`${styles.input} ${errors.treinador ? styles.inputError : ''}`}
          placeholder="Digite o nome do treinador"
        />
        {errors.treinador && <span className={styles.error}>{errors.treinador}</span>}
      </div>

      <button type="submit" className={styles.submitButton}>
        {submitText}
      </button>
    </form>
  );
} 
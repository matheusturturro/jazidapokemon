# Frontend do Projeto de Pokémons 🎮

Este é o frontend do projeto de gerenciamento de Pokémons, construído com React, TypeScript e Vite.

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:
- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## 🚀 Como Executar o Projeto

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Acesse o projeto**
   - Abra seu navegador
   - Acesse `http://localhost:5173`

## 📦 Instalação de Dependências

```bash
# Axios para fazer requisições HTTP
npm install axios

# React Router para navegação
npm install react-router-dom

# React Icons para ícones
npm install react-icons
```

## 🎯 Funcionalidades Implementadas

1. **Lista de Pokémons**
   - Visualização em grid
   - Cards com informações básicas
   - Botão para ver detalhes

2. **Detalhes do Pokémon**
   - Informações completas
   - Opção de editar
   - Opção de deletar

3. **Formulário de Criação/Edição**
   - Validação de campos
   - Feedback visual
   - Mensagens de erro/sucesso

## 🔧 Configuração da API

Crie um arquivo `src/services/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;
```

## 📱 Exemplos de Componentes com CSS Modules

1. **PokemonCard**
```typescript
// src/components/PokemonCard/index.tsx
import styles from './styles.module.css';

interface PokemonCardProps {
  pokemon: {
    id: number;
    tipo: string;
    treinador: string;
    nivel: number;
  };
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{pokemon.tipo}</h2>
      <p className={styles.info}>Treinador: {pokemon.treinador}</p>
      <p className={styles.info}>Nível: {pokemon.nivel}</p>
      <button className={styles.button}>Ver Detalhes</button>
    </div>
  );
}
```

```css
/* src/components/PokemonCard/styles.module.css */
.card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.info {
  color: #666;
  margin-bottom: 4px;
}

.button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #2563eb;
}
```

2. **PokemonForm**
```typescript
// src/components/PokemonForm/index.tsx
import { useState } from 'react';
import styles from './styles.module.css';

interface PokemonFormProps {
  onSubmit: (data: { tipo: string; treinador: string }) => void;
}

export function PokemonForm({ onSubmit }: PokemonFormProps) {
  const [formData, setFormData] = useState({
    tipo: '',
    treinador: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          className={styles.input}
        >
          <option value="">Selecione um tipo</option>
          <option value="pikachu">Pikachu</option>
          <option value="charizard">Charizard</option>
          <option value="mewtwo">Mewtwo</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="treinador">Treinador</label>
        <input
          type="text"
          id="treinador"
          value={formData.treinador}
          onChange={(e) => setFormData({ ...formData, treinador: e.target.value })}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Criar Pokémon
      </button>
    </form>
  );
}
```

```css
/* src/components/PokemonForm/styles.module.css */
.form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.formGroup {
  margin-bottom: 16px;
}

.formGroup label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.submitButton {
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submitButton:hover {
  background-color: #2563eb;
}
```

## 🔄 Integração com o Backend

1. **Listar Pokémons**
```typescript
const getPokemons = async () => {
  try {
    const response = await api.get('/pokemons');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pokémons:', error);
    throw error;
  }
};
```

2. **Criar Pokémon**
```typescript
const createPokemon = async (pokemonData: PokemonFormData) => {
  try {
    const response = await api.post('/pokemons', pokemonData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pokémon:', error);
    throw error;
  }
};
```

## 🆘 Solução de Problemas

1. **Erro de CORS**
   - Verifique se o backend está configurado para aceitar requisições do frontend
   - Adicione os headers necessários no backend

2. **Erro de Conexão**
   - Verifique se o backend está rodando
   - Confirme se a URL da API está correta

3. **Erro de Compilação**
   - Verifique se todas as dependências estão instaladas
   - Limpe o cache do npm: `npm clean-cache --force`

## 📖 Recursos Adicionais

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Vite](https://vitejs.dev/guide/)
- [Documentação do CSS Modules](https://github.com/css-modules/css-modules)
- [Documentação do Axios](https://axios-http.com/docs/intro)


//npm.cmd install
//npm.cmd install --save-dev @types/express
//npm.cmd run build
//npm start


//cd frontend-pokemon
//npm.cmd install
//npm.cmd run dev
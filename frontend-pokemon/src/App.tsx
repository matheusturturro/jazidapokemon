import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PokemonDetails } from './pages/PokemonDetails';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

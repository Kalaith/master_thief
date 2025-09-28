import React, { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';
import HeistGame from './components/game/HeistGame';

const App: React.FC = () => {
  const { loadGame } = useGameStore();

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  return <HeistGame />;
};

export default App;

import React, { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';
import HeistGame from './components/game/HeistGame';

const App: React.FC = () => {
  const { initializeGame } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return <HeistGame />;
};

export default App;

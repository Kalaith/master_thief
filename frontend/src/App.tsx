import React, { useEffect } from 'react';
import { useGameStore } from './stores/gameStore';
import Phase1Demo from './components/game/phases/Phase1Demo';

const App: React.FC = () => {
  const { initializeGame } = useGameStore();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return <Phase1Demo />;
};

export default App;

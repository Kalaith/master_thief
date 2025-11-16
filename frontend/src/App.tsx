import React, { useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useGameStore } from './stores/gameStore';
import HeistGame from './components/game/HeistGame';

const App: React.FC = () => {
  const { loadGame, activeAutomatedHeists, updateActiveHeistTime, completeAutomatedHeist } = useGameStore();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  // Global mission timer - runs every minute
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Timer interval configuration
    // TESTING: Use 10000 (10 seconds) for faster testing
    // PRODUCTION: Use 60000 (60 seconds / 1 minute) for normal gameplay
    const TIMER_INTERVAL = 10000; // 10 seconds for testing

    // Start mission timer
    timerRef.current = window.setInterval(() => {
      const currentHeists = useGameStore.getState().activeAutomatedHeists;

      currentHeists.forEach((activeHeist) => {
        const newTimeRemaining = activeHeist.timeRemaining - 1;

        if (newTimeRemaining <= 0) {
          // Mission complete!
          completeAutomatedHeist(activeHeist.heist.id);
        } else {
          // Update time
          updateActiveHeistTime(activeHeist.heist.id, newTimeRemaining);
        }
      });
    }, TIMER_INTERVAL);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeAutomatedHeists.length]); // Re-create timer when missions change

  return (
    <>
      <HeistGame />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#f5f5f5',
            border: '1px solid #d4af37',
          },
        }}
      />
    </>
  );
};

export default App;

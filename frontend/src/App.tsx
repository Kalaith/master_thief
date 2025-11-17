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
            background: '#161B22',
            color: '#e5e7eb',
            border: '1px solid #22d3ee',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.3)',
            fontFamily: 'monospace',
          },
          success: {
            style: {
              border: '1px solid #34d399',
              boxShadow: '0 0 10px rgba(52, 211, 153, 0.3)',
            },
            iconTheme: {
              primary: '#34d399',
              secondary: '#161B22',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#161B22',
            },
          },
        }}
      />
    </>
  );
};

export default App;

import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import RecruitmentPhase from './phases/RecruitmentPhase';
import HeistSelectionPhase from './phases/HeistSelectionPhase';
import PlanningPhase from './phases/PlanningPhase';
import ExecutionPhase from './phases/ExecutionPhase';
import ResultsPhase from './phases/ResultsPhase';

const HeistGame: React.FC = () => {
  const { currentPhase, budget, heistsCompleted } = useGameStore();

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'recruitment-phase':
        return <RecruitmentPhase />;
      case 'heist-selection-phase':
        return <HeistSelectionPhase />;
      case 'planning-phase':
        return <PlanningPhase />;
      case 'execution-phase':
        return <ExecutionPhase />;
      case 'results-phase':
        return <ResultsPhase />;
      default:
        return <RecruitmentPhase />;
    }
  };

  return (
    <div className="min-h-screen bg-noir-900 text-noir-200">
      {/* Game Header - Elegant Mafia Noir Style */}
      <header className="bg-noir-800 border-b-2 border-gold-500 p-6 shadow-gold">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-serif font-bold text-gold-300">
              🎭 Master Thief
            </h1>
            <span className="text-gold-400 font-serif text-lg italic">
              Criminal Empire
            </span>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-2 bg-noir-700 px-4 py-2 rounded-lg border border-gold-500/30">
              <span className="text-noir-300 font-medium">War Chest:</span>
              <span className="text-gold-300 font-bold text-xl">${budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-noir-700 px-4 py-2 rounded-lg border border-blood-500/30">
              <span className="text-noir-300 font-medium">Jobs Done:</span>
              <span className="text-blood-500 font-bold text-xl">{heistsCompleted}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="container mx-auto p-6">
        <div className="game-phase">
          {renderCurrentPhase()}
        </div>
      </main>

      {/* Atmospheric Footer */}
      <footer className="mt-auto bg-noir-800 border-t border-gold-500/20 p-4">
        <div className="container mx-auto text-center">
          <span className="text-gold-400 font-serif italic text-sm">
            "In the shadows of the city, legends are made..."
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HeistGame;
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
    <div className="min-h-screen bg-daemon-dark text-daemon-text">
      {/* Game Header */}
      <header className="bg-daemon-panel border-b border-daemon-secondary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-daemon-text-bright">🎭 Master Thief</h1>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-daemon-text-muted">Budget:</span>
              <span className="text-daemon-gold font-semibold">${budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-daemon-text-muted">Heists Completed:</span>
              <span className="text-daemon-text-bright font-semibold">{heistsCompleted}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="container mx-auto p-4">
        {renderCurrentPhase()}
      </main>
    </div>
  );
};

export default HeistGame;
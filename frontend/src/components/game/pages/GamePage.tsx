import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import RecruitmentPhase from '../phases/RecruitmentPhase';
import HeistSelectionPhase from '../phases/HeistSelectionPhase';
import PlanningPhase from '../phases/PlanningPhase';
import ExecutionPhase from '../phases/ExecutionPhase';
import ResultsPhase from '../phases/ResultsPhase';

const GamePage: React.FC = () => {
  const { currentPhase } = useGameStore();

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

  return <div className="game-phase">{renderCurrentPhase()}</div>;
};

export default GamePage;